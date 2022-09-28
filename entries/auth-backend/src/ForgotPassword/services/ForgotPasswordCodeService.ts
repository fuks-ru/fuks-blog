import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import { differenceInSeconds } from 'date-fns';
import { Injectable } from '@nestjs/common';

import { ForgotPasswordCode } from 'auth-backend/ForgotPassword/entities/ForgotPasswordCode';
import { User } from 'auth-backend/User/entities/User';
import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';

@Injectable()
export class ForgotPasswordCodeService {
  public constructor(
    @InjectRepository(ForgotPasswordCode)
    private readonly forgotPasswordCodeRepository: Repository<ForgotPasswordCode>,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Добавляет код подтверждения в БД. Или обновляет, если он уже существует.
   */
  public async addForgotPasswordCodeToUser(
    user: User,
    redirectFrom: string,
  ): Promise<ForgotPasswordCode> {
    const existCode = await this.forgotPasswordCodeRepository.findOneBy({
      user,
    });

    const newValue = v4();

    if (!existCode) {
      const forgotPasswordCode = new ForgotPasswordCode();

      forgotPasswordCode.value = newValue;
      forgotPasswordCode.user = user;
      forgotPasswordCode.redirectFrom = redirectFrom;

      return this.forgotPasswordCodeRepository.save(forgotPasswordCode);
    }

    const lastUpdatedAtDifference = differenceInSeconds(
      new Date(),
      existCode.updatedAt,
    );

    if (lastUpdatedAtDifference < 60) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.FORGOT_PASSWORD_CODE_TIMEOUT,
        i18n.t('beforeResending', {
          args: {
            seconds: 60 - lastUpdatedAtDifference,
          },
        }),
      );
    }

    existCode.value = newValue;
    existCode.redirectFrom = redirectFrom;

    return this.forgotPasswordCodeRepository.save(existCode);
  }

  /**
   * Получает код по его значению.
   */
  public async getByValue(value: string): Promise<ForgotPasswordCode> {
    const forgotPasswordCode =
      await this.forgotPasswordCodeRepository.findOneBy({
        value,
      });

    if (!forgotPasswordCode) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.FORGOT_PASSWORD_NOT_EXIST,
        i18n.t('forgotPasswordCodeNotExist'),
      );
    }

    return forgotPasswordCode;
  }

  /**
   * Удаляет код по ID.
   */
  public async removeById(id: string): Promise<void> {
    await this.forgotPasswordCodeRepository.delete({
      id,
    });
  }
}
