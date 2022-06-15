import {
  CommonErrorCode,
  SystemErrorFactory,
  ValidationErrorFactory,
} from '@difuks/common';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-custom';
import { isEmail } from 'class-validator';

import { BasicLoginRequest } from 'auth-backend/BasicLogin/dto/BasicLoginRequest';
import { User } from 'auth-backend/User/entities/User';
import { BasicLoginService } from 'auth-backend/BasicLogin/services/BasicLoginService';

interface IRequest extends ExpressRequest {
  body: BasicLoginRequest;
}

@Injectable()
export class BasicLoginStrategy extends PassportStrategy(Strategy, 'local') {
  public constructor(
    private readonly basicAuthService: BasicLoginService,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly validationErrorFactory: ValidationErrorFactory,
  ) {
    super();
  }

  /**
   * Валидация по email и пароль.
   */
  public async validate({ body }: IRequest): Promise<User> {
    const emailErrors: string[] = [];
    const passwordErrors: string[] = [];

    if (!body.email) {
      emailErrors.push('Введите email');
    }

    if (body.email && !isEmail(body.email)) {
      emailErrors.push('Некорректный формат email');
    }

    if (!body.password) {
      passwordErrors.push('Введите пароль');
    }

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      throw this.validationErrorFactory.createFromData({
        email: emailErrors,
        password: passwordErrors,
      });
    }

    const user = await this.basicAuthService.validateUser(
      body.email,
      body.password,
    );

    if (!user) {
      throw this.systemErrorFactory.create(
        CommonErrorCode.UNAUTHORIZED,
        'Неверный логин или пароль',
      );
    }

    return user;
  }
}
