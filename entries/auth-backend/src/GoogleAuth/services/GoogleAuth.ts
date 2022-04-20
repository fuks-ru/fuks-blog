import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

import { ErrorCode } from 'auth-backend/SystemError/dto/SystemError';
import { SystemErrorFactory } from 'auth-backend/SystemError/services/SystemErrorFactory';

@Injectable()
export class GoogleAuth {
  private readonly clientId =
    '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com';

  private readonly user = {
    id: '1',
    name: 'Дима',
    email: 'difuks@gmail.com',
  };

  private readonly client = new OAuth2Client(this.clientId);

  public constructor(private readonly systemErrorFactory: SystemErrorFactory) {}

  /**
   * Авторизуют пользователя.
   */
  public async auth(token: string): Promise<string> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: this.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw this.systemErrorFactory.create(
        ErrorCode.GOOGLE_AUTH_PAYLOAD_EMPTY,
        'Нет ответа от Google API',
      );
    }

    const { email } = payload;

    if (email !== this.user.email) {
      throw this.systemErrorFactory.create(
        ErrorCode.GOOGLE_AUTH_USER_NOT_FOUND,
        'Пользователь не найдет',
      );
    }

    return this.user.id;
  }
}
