import { Injectable } from '@nestjs/common';

import { EncodingService } from 'auth-backend/Encoding/services/EncodingService';
import { SystemErrorFactory } from 'auth-backend/SystemError/services/SystemErrorFactory';
import { User } from 'auth-backend/User/entities/User';
import { UserService } from 'auth-backend/User/services/UserService';

@Injectable()
export class BasicAuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Валидирует email и пароль пользователя.
   */
  public async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isValidPassword = await this.encodingService.verify(
      user.hashedPassword,
      password,
    );

    if (isValidPassword) {
      return user;
    }

    return null;
  }
}
