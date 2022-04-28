import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemErrorFactory } from '@difuks/common';

import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import { User } from 'auth-backend/User/entities/User';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  /**
   * Добавляет пользователя, если он не существует.
   */
  public async addUserIfNotExists(user: User): Promise<User> {
    const existUser = await this.findByEmail(user.email);

    if (existUser) {
      throw this.systemErrorFactory.create(
        ErrorCode.USER_ALREADY_EXISTS,
        'Пользователь уже существует',
      );
    }

    return this.addUser(user);
  }

  /**
   * Добавляет пользователя в БД.
   */
  public addUser(user: User): Promise<User> {
    return this.userRepository.save(user);
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
   * Получает пользователя по id.
   */
  public async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw this.systemErrorFactory.create(
        ErrorCode.USER_NOT_FOUND,
        'Пользователь не найден',
      );
    }

    return user;
  }
}
