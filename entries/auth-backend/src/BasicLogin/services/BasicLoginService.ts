import { Injectable } from '@nestjs/common';
import { EncodingService } from '@fuks-ru/common-backend';

import { User } from 'auth-backend/User/entities/User';
import { UserService } from 'auth-backend/User/services/UserService';

@Injectable()
export class BasicLoginService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Валидирует email и пароль пользователя.
   */
  public async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findConfirmedByEmail(email);

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
