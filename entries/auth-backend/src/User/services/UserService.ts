import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'auth-backend/User/entities/User';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

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
}
