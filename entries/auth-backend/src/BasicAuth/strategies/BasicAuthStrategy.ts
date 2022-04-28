import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SystemErrorFactory } from '@difuks/common';

import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import { User } from 'auth-backend/User/entities/User';
import { BasicAuthService } from 'auth-backend/BasicAuth/services/BasicAuthService';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(Strategy) {
  public constructor(
    private readonly basicAuthService: BasicAuthService,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
   * Валидация по email и пароль.
   */
  public async validate(username: string, password: string): Promise<User> {
    const user = await this.basicAuthService.validateUser(username, password);

    if (!user) {
      throw this.systemErrorFactory.create(
        ErrorCode.BASIC_AUTH_INCORRECT_EMAIL_OR_PASSWORD,
        'Неверный логин или пароль',
      );
    }

    return user;
  }
}
