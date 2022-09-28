import {
  SystemError,
  I18nResolver,
  SystemErrorFactory,
} from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { ConfirmCode } from 'auth-backend/Register/modules/EmailVerify/entities/ConfirmCode';
import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import { User } from 'auth-backend/User/entities/User';
import { ForgotPasswordCode } from 'auth-backend/ForgotPassword/entities/ForgotPasswordCode';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Добавляет пользователя, если он не существует. Или обновляет, если не
   * подтвержден.
   */
  public async addUserIfNotConfirmed(user: User): Promise<User> {
    const existUser = await this.findByEmail(user.email);

    if (existUser?.isConfirmed) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.USER_ALREADY_EXISTS,
        i18n.t('userAlreadyExists'),
      );
    }

    if (existUser && !existUser.isConfirmed) {
      existUser.hashedPassword = user.hashedPassword;
      existUser.isConfirmed = user.isConfirmed;

      return this.addOrUpdateUser({
        ...existUser,
      });
    }

    return this.addOrUpdateUser(user);
  }

  /**
   * Добавляет или обновляет пользователя в БД.
   */
  public addOrUpdateUser(user: DeepPartial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  /**
   * Удаляет пользователя в БД по id.
   */
  public async deleteById(id: string): Promise<void> {
    await this.userRepository.delete({
      id,
    });
  }

  /**
   * Ищет подтвержденного пользователя по email.
   */
  public async findConfirmedByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email,
      isConfirmed: true,
    });
  }

  /**
   * Ищет пользователя по email.
   */
  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  /**
   * Получает пользователя по id.
   */
  public async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    return user;
  }

  /**
   * Ищет пользователя по id.
   */
  public findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      id,
    });
  }

  /**
   * Получает подтвержденного пользователя по id.
   */
  public async getConfirmedById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
      isConfirmed: true,
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    return user;
  }

  /**
   * Получает неподтвержденного пользователя по email.
   */
  public async getUnConfirmedByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email,
      isConfirmed: false,
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    return user;
  }

  /**
   * Получает подтвержденного пользователя по email.
   */
  public async getConfirmedByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email,
      isConfirmed: true,
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    return user;
  }

  /**
   * Активирует пользователя по коду подтверждения.
   */
  public async confirmByConfirmCode(confirmCode: ConfirmCode): Promise<User> {
    const user = await this.userRepository.findOneBy({
      confirmCode: {
        id: confirmCode.id,
      },
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    user.isConfirmed = true;

    return this.userRepository.save(user);
  }

  /**
   * Меняет пароль пользователя по коду смены пароля.
   */
  public async changePasswordByForgotPasswordCode(
    forgotPassword: ForgotPasswordCode,
    hashedPassword: string,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({
      forgotPassword: {
        id: forgotPassword.id,
      },
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    user.hashedPassword = hashedPassword;

    return this.userRepository.save(user);
  }

  /**
   * Получает список всех пользователей.
   */
  public async getList(): Promise<User[]> {
    return this.userRepository.find();
  }

  private async getNotFoundError(): Promise<SystemError> {
    const i18n = await this.i18nResolver.resolve();

    return this.systemErrorFactory.create(
      ErrorCode.USER_NOT_FOUND,
      i18n.t('userNotFound'),
    );
  }
}
