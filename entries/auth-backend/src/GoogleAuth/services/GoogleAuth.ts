import { Injectable } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library';

import { User } from 'auth-backend/User/entities/User';
import { EmailRegisterService } from 'auth-backend/Register/services/EmailRegisterService';
import { ErrorCode } from 'auth-backend/SystemError/dto/SystemError';
import { SystemErrorFactory } from 'auth-backend/SystemError/services/SystemErrorFactory';
import { UserService } from 'auth-backend/User/services/UserService';

@Injectable()
export class GoogleAuth {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly userService: UserService,
    private readonly emailRegisterService: EmailRegisterService,
  ) {}

  /**
   * Авторизуют пользователя по google профилю.
   */
  public async auth(tokenPayload: TokenPayload): Promise<User> {
    if (!tokenPayload.email) {
      throw this.systemErrorFactory.create(
        ErrorCode.GOOGLE_AUTH_EMAIL_NOT_FOUND,
        'Пользователь не найдет',
      );
    }

    return (
      (await this.userService.findByEmail(tokenPayload.email)) ||
      (await this.emailRegisterService.register(tokenPayload.email))
    );
  }
}
