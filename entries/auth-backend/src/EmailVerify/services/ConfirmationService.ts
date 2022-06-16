import { RedirectErrorFactory } from '@difuks/common/dist';
import { Injectable } from '@nestjs/common';

import { ConfirmCodeService } from 'auth-backend/EmailVerify/services/ConfirmCodeService';
import { LoginService } from 'auth-backend/Login/services/LoginService';
import { UserService } from 'auth-backend/User/services/UserService';

@Injectable()
export class ConfirmationService {
  public constructor(
    private readonly confirmCodeService: ConfirmCodeService,
    private readonly userService: UserService,
    private readonly redirectErrorFactory: RedirectErrorFactory,
    private readonly loginService: LoginService,
  ) {}

  /**
   * Подтверждает email пользователя, активирует его и осуществляет вход.
   */
  public async confirm(value: string): Promise<void> {
    const confirmCode = await this.confirmCodeService.getByValue(value);

    const user = await this.userService.confirmByConfirmCode(confirmCode);

    await this.confirmCodeService.removeById(confirmCode.id);

    this.loginService.login(user, confirmCode.redirectFrom);
  }
}
