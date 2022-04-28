import { CONFIG, SystemErrorFactory } from '@difuks/common';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { Strategy } from 'passport-custom';

import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import { GoogleAuthRequest } from 'auth-backend/GoogleAuth/dto/GoogleAuthRequest';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { GoogleAuth } from 'auth-backend/GoogleAuth/services/GoogleAuth';
import { User } from 'auth-backend/User/entities/User';

interface IRequest extends ExpressRequest {
  body: GoogleAuthRequest;
}

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly client: OAuth2Client;

  public constructor(
    private readonly googleAuth: GoogleAuth,
    private readonly systemErrorFactory: SystemErrorFactory,
    @Inject(CONFIG)
    private readonly configGetter: ConfigGetter,
  ) {
    super();

    this.client = new OAuth2Client({
      clientId: configGetter.getGoogleClientId(),
    });
  }

  /**
   * Валидация по token.
   */
  private async validate(request: IRequest): Promise<User> {
    const ticket = await this.client.verifyIdToken({
      idToken: request.body.accessToken,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw this.systemErrorFactory.create(
        ErrorCode.GOOGLE_AUTH_PAYLOAD_EMPTY,
        'Нет ответа от Google API',
      );
    }

    return this.googleAuth.auth(payload);
  }
}
