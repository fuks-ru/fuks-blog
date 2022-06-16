import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserVerifyRequest } from 'auth-backend/Auth/dto/UserVerifyRequest';
import { UserVerifyResponse } from 'auth-backend/Auth/dto/UserVerifyResponse';
import { IJwtPayload } from 'auth-backend/Login/dto/IJwtPayload';
import { UserService } from 'auth-backend/User/services/UserService';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Проверяет токен и возвращает пользователя.
   */
  public async verify(
    userVerifyRequest: UserVerifyRequest,
  ): Promise<UserVerifyResponse> {
    const payload = this.jwtService.verify<IJwtPayload>(
      userVerifyRequest.jwtToken,
    );

    const { hashedPassword, ...user } = await this.userService.getConfirmedById(
      payload.id,
    );

    return user;
  }
}
