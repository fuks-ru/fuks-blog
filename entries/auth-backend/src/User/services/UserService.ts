import { SystemError } from '@difuks/common/dist/backend/SystemError/dto/SystemError';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemErrorFactory } from '@difuks/common';

import { ConfirmCode } from 'auth-backend/EmailVerify/entities/ConfirmCode';
import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import { User } from 'auth-backend/User/entities/User';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  /**
   * Добавляет пользователя, если он не существует. Или обновляет, если не подтвержден.
   */
  public async addUserIfNotConfirmed(user: User): Promise<User> {
    const existUser = await this.findByEmail(user.email);

    if (existUser?.isConfirmed) {
      throw this.systemErrorFactory.create(
        ErrorCode.USER_ALREADY_EXISTS,
        'Пользователь уже существует',
      );
    }

    if (existUser && !existUser.isConfirmed) {
      existUser.hashedPassword = user.hashedPassword;

      return this.addOrUpdateUser({
        ...existUser,
      });
    }

    return this.addOrUpdateUser(user);
  }

  /**
   * Добавляет пользователя в БД.
   */
  public addOrUpdateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
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
      throw this.getNotFoundError();
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
      throw this.getNotFoundError();
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
      throw this.getNotFoundError();
    }

    user.isConfirmed = true;

    return this.userRepository.save(user);
  }

  private getNotFoundError(): SystemError {
    return this.systemErrorFactory.create(
      ErrorCode.USER_NOT_FOUND,
      'Пользователь не найден',
    );
  }
}
