import {
  SystemErrorFactory,
  ValidationErrorFactory,
  I18nResolver,
} from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { Strategy } from 'passport-custom';

import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import { GoogleLoginRequest } from 'auth-backend/GoogleLogin/dto/GoogleLoginRequest';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { GoogleLoginAuth } from 'auth-backend/GoogleLogin/services/GoogleLoginAuth';
import { User } from 'auth-backend/User/entities/User';

interface IRequest extends ExpressRequest {
  body: GoogleLoginRequest;
}

@Injectable()
export class GoogleLoginStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly client: OAuth2Client;

  public constructor(
    private readonly googleAuth: GoogleLoginAuth,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly configGetter: ConfigGetter,
    private readonly validationErrorFactory: ValidationErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {
    super();

    this.client = new OAuth2Client({
      clientId: configGetter.getGoogleClientId(),
    });
  }

  /**
   * Валидация по token.
   */
  private async validate({ body }: IRequest): Promise<User> {
    const i18n = await this.i18nResolver.resolve();

    if (!body.accessToken) {
      throw await this.validationErrorFactory.createFromData({
        accessToken: [i18n.t('emptyToken')],
      });
    }

    const ticket = await this.client.verifyIdToken({
      idToken: body.accessToken,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw this.systemErrorFactory.create(
        ErrorCode.GOOGLE_AUTH_PAYLOAD_EMPTY,
        i18n.t('googleApiEmptyResponse'),
      );
    }

    return this.googleAuth.auth(payload);
  }
}
