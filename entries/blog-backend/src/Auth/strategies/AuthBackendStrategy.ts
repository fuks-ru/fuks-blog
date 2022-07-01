import { Client, getApi, TApiResponse } from '@difuks/auth-backend';
import { CommonErrorCode, SystemErrorFactory } from '@difuks/common/dist';
import { urls } from '@difuks/common/dist/constants';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-custom';

interface IRequest extends ExpressRequest {
  cookies: {
    jwtToken?: string;
  };
}

@Injectable()
export class AuthBackendStrategy extends PassportStrategy(
  Strategy,
  'auth-backend',
) {
  private authApi!: Client;

  public constructor(private readonly systemErrorFactory: SystemErrorFactory) {
    super();

    void this.initApi();
  }

  private async initApi(): Promise<void> {
    this.authApi = await getApi(urls.AUTH_BACKEND_URL);
  }

  private async validate(
    request: IRequest,
  ): Promise<TApiResponse<'authVerify'>> {
    const { jwtToken } = request.cookies;

    if (!jwtToken) {
      throw this.systemErrorFactory.create(
        CommonErrorCode.FORBIDDEN,
        'Отсутствует токен авторизации.',
      );
    }

    try {
      this.authApi.defaults.headers.common.cookie =
        request.headers.cookie || '';

      const response = await this.authApi.authVerify(null, {
        jwtToken,
      });

      return response.data;
    } catch {
      throw this.systemErrorFactory.create(
        CommonErrorCode.FORBIDDEN,
        'Ошибка авторизации.',
      );
    }
  }
}
