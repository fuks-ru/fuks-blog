import {
  RedirectErrorFactory,
  CookieSetterService,
} from '@fuks-ru/common-backend';
import { urls } from '@fuks-ru/constants';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IJwtPayload } from 'auth-backend/Login/dto/IJwtPayload';
import { JWT_TOKEN_COOKIE_NAME } from 'auth-backend/Login/utils/constants';
import { User } from 'auth-backend/User/entities/User';

@Injectable()
export class LoginService {
  public constructor(
    private readonly cookieSetterService: CookieSetterService,
    private readonly jwtService: JwtService,
    private readonly redirectErrorFactory: RedirectErrorFactory,
  ) {}

  /**
   * Генерирует jwt и устанавливает куку.
   */
  public login(user: User, redirectFrom?: string): void {
    const payload: IJwtPayload = {
      id: user.id,
    };

    const jwtToken = this.jwtService.sign(payload);

    this.cookieSetterService.setCookie(JWT_TOKEN_COOKIE_NAME, jwtToken, {
      httpOnly: true,
    });

    throw this.redirectErrorFactory.create({
      location: redirectFrom || urls.BLOG_FRONTEND_URL,
    });
  }
}
