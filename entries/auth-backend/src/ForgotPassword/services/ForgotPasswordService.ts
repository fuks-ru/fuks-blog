import { urls } from '@difuks/common/dist/constants';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import qs from 'qs';

import { User } from 'auth-backend/User/entities/User';
import { ForgotPasswordCodeService } from 'auth-backend/ForgotPassword/services/ForgotPasswordCodeService';

@Injectable()
export class ForgotPasswordService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly forgotPasswordCodeService: ForgotPasswordCodeService,
  ) {}

  /**
   * Отправляет код восстановления пароля пользователю.
   */
  public async send(
    user: User,
    redirectFrom: string = urls.BLOG_FRONTEND_URL,
  ): Promise<void> {
    const forgotPasswordCode =
      await this.forgotPasswordCodeService.addForgotPasswordCodeToUser(
        user,
        redirectFrom,
      );

    const changePasswordUrl = `${
      urls.AUTH_FRONTEND_URL
    }/change-password?${qs.stringify({
      forgotPasswordCode: forgotPasswordCode.value,
    })}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Восстановления пароля',
      text: `Для восстановления пароля перейдите по ссылке: ${changePasswordUrl}`,
    });
  }
}
