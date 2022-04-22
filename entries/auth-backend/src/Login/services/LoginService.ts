import { Injectable } from '@nestjs/common';
import { CookieSetterService } from '@difuks/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'auth-backend/User/entities/User';

@Injectable()
export class LoginService {
  public constructor(
    private readonly cookieSetterService: CookieSetterService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Генерирует jwt и устанавливает куку.
   */
  public login(user: User): void {
    const jwtToken = this.jwtService.sign({
      id: user.id,
    });

    this.cookieSetterService.setCookie('jwtToken', jwtToken, {
      httpOnly: true,
    });
  }
}
