import {
  SystemErrorFactory,
  ValidationErrorFactory,
} from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Strategy } from 'passport-custom';
import { isEmail } from 'class-validator';

import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
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
    private readonly moduleRef: ModuleRef,
  ) {
    super();
  }

  /**
   * Валидация по email и пароль.
   */
  public async validate(request: IRequest): Promise<User> {
    const contextId = ContextIdFactory.getByRequest(request);

    this.moduleRef.registerRequestByContextId(request, contextId);

    const i18n = await this.moduleRef.resolve(
      I18nRequestScopeService,
      contextId,
      {
        strict: false,
      },
    );

    const emailErrors: string[] = [];
    const passwordErrors: string[] = [];

    const { body } = request;

    if (!body.email) {
      emailErrors.push(i18n.t('enterEmail'));
    }

    if (body.email && !isEmail(body.email)) {
      emailErrors.push(i18n.t('incorrectEmailFormat'));
    }

    if (!body.password) {
      passwordErrors.push(i18n.t('enterPassword'));
    }

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      throw await this.validationErrorFactory.createFromData({
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
        ErrorCode.UNAUTHORIZED,
        i18n.t('incorrectEmailOrPassword'),
      );
    }

    return user;
  }
}
