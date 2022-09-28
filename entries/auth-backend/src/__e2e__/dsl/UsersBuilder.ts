import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { EncodingModule, EncodingService } from '@fuks-ru/common-backend';

import { Role, User } from 'auth-backend/User/entities/User';
import { UserModule } from 'auth-backend/User/UserModule';

/**
 * Описывает фейкового пользователя.
 */
export interface IMockedUser {
  /**
   * Email.
   */
  email: string;
  /**
   * Пароль.
   */
  password: string;
  /**
   * Роль.
   */
  role: Role;
}

export class UsersBuilder {
  private readonly mockedUsers: IMockedUser[] = [];

  /**
   * Добавляет пользователя.
   */
  public addUser(...users: IMockedUser[]): void {
    this.mockedUsers.push(...users);
  }

  /**
   * Осуществляет добавление в базу.
   */
  public async build(app: INestApplication): Promise<void> {
    if (this.mockedUsers.length === 0) {
      return;
    }

    const userRepository = app
      .select(UserModule)
      .get<Repository<User>>(getRepositoryToken(User));

    const encodingService = app
      .select(EncodingModule)
      .get<EncodingService>(EncodingService);

    const users: Array<DeepPartial<User>> = [];

    for (const mockedUser of this.mockedUsers) {
      const hashedPassword = await encodingService.hash(mockedUser.password);

      users.push({
        email: mockedUser.email,
        role: mockedUser.role,
        isConfirmed: true,
        hashedPassword,
      });
    }

    const entities = userRepository.create(users);

    await userRepository.insert(entities);
  }
}
