import { SystemErrorFactory, I18nResolver } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { differenceInSeconds } from 'date-fns';

import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import { User } from 'auth-backend/User/entities/User';
import { ConfirmCode } from 'auth-backend/Register/modules/EmailVerify/entities/ConfirmCode';

@Injectable()
export class ConfirmCodeService {
  public constructor(
    @InjectRepository(ConfirmCode)
    private readonly confirmCodeRepository: Repository<ConfirmCode>,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Добавляет код подтверждения в БД. Или обновляет, если он уже существует.
   */
  public async addConfirmCodeToUser(
    user: User,
    redirectFrom: string,
  ): Promise<ConfirmCode> {
    const existCode = await this.confirmCodeRepository.findOneBy({
      user,
    });

    const newValue = v4();

    if (!existCode) {
      const confirmCode = new ConfirmCode();

      confirmCode.value = newValue;
      confirmCode.user = user;
      confirmCode.redirectFrom = redirectFrom;

      return this.confirmCodeRepository.save(confirmCode);
    }

    const lastUpdatedAtDifference = differenceInSeconds(
      new Date(),
      existCode.updatedAt,
    );

    if (lastUpdatedAtDifference < 60) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.CONFIRM_CODE_TIMEOUT,
        i18n.t('beforeResending', {
          args: {
            seconds: 60 - lastUpdatedAtDifference,
          },
        }),
      );
    }

    existCode.value = newValue;
    existCode.redirectFrom = redirectFrom;

    return this.confirmCodeRepository.save(existCode);
  }

  /**
   * Получает код по его значению.
   */
  public async getByValue(value: string): Promise<ConfirmCode> {
    const confirmCode = await this.confirmCodeRepository.findOneBy({
      value,
    });

    if (!confirmCode) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.CONFIRM_CODE_NOT_EXIST,
        i18n.t('confirmationCodeNotExist'),
      );
    }

    return confirmCode;
  }

  /**
   * Удаляет код по ID.
   */
  public async removeById(id: string): Promise<void> {
    await this.confirmCodeRepository.delete({
      id,
    });
  }
}
