import {
  CONFIG,
  ConfigGetterBase,
  SystemErrorFactory,
  CommonErrorCode,
} from '@difuks/common';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-custom';
import { getApi, Client, TApiResponse } from '@difuks/auth-backend/dist/lib';

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

  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    @Inject(CONFIG)
    private readonly configGetter: ConfigGetterBase,
  ) {
    super();

    void this.initApi();
  }

  private async initApi(): Promise<void> {
    const authConfig = this.configGetter.getAuthConfig();

    this.authApi = await getApi(authConfig.authBackendUrl);
  }

  private async validate(
    request: IRequest,
  ): Promise<TApiResponse<'loginVerify'>> {
    const { jwtToken } = request.cookies;

    if (!jwtToken) {
      throw this.systemErrorFactory.create(
        CommonErrorCode.FORBIDDEN,
        'Отсутствует токен авторизации',
      );
    }

    const response = await this.authApi.loginVerify(null, {
      jwtToken,
    });

    return response.data;
  }
}
