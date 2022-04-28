import { Injectable } from '@nestjs/common';
import { CookieSetterService } from '@difuks/common';
import { JwtService } from '@nestjs/jwt';

import { IJwtPayload } from 'auth-backend/Login/dto/IJwtPayload';
import { UserVerifyRequest } from 'auth-backend/Login/dto/UserVerifyRequest';
import { UserVerifyResponse } from 'auth-backend/Login/dto/UserVerifyResponse';
import { JWT_TOKEN_COOKIE_NAME } from 'auth-backend/Login/utils/constants';
import { User } from 'auth-backend/User/entities/User';
import { UserService } from 'auth-backend/User/services/UserService';

@Injectable()
export class LoginService {
  public constructor(
    private readonly cookieSetterService: CookieSetterService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Генерирует jwt и устанавливает куку.
   */
  public login(user: User): void {
    const payload: IJwtPayload = {
      id: user.id,
    };

    const jwtToken = this.jwtService.sign(payload);

    this.cookieSetterService.setCookie(JWT_TOKEN_COOKIE_NAME, jwtToken, {
      httpOnly: true,
    });
  }

  /**
   * Проверяет токен и возвращает пользователя.
   */
  public async verify(
    userVerifyRequest: UserVerifyRequest,
  ): Promise<UserVerifyResponse> {
    const payload = this.jwtService.verify<IJwtPayload>(
      userVerifyRequest.jwtToken,
    );

    const { hashedPassword, ...user } = await this.userService.getById(
      payload.id,
    );

    return user;
  }
}
