import { Injectable } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library';
import { SystemErrorFactory } from '@difuks/common';

import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import { User } from 'auth-backend/User/entities/User';
import { EmailRegisterService } from 'auth-backend/Register/services/EmailRegisterService';
import { UserService } from 'auth-backend/User/services/UserService';

@Injectable()
export class GoogleLoginAuth {
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
        'Email не найдет',
      );
    }

    return (
      (await this.userService.findConfirmedByEmail(tokenPayload.email)) ||
      (await this.emailRegisterService.register(tokenPayload.email))
    );
  }
}
