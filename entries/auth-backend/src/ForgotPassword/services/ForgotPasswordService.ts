import { I18nResolver } from '@difuks/common';
import { urls } from '@difuks/common/dist/constants';
import { Injectable } from '@nestjs/common';
import qs from 'qs';

import { User } from 'auth-backend/User/entities/User';
import { ForgotPasswordCodeService } from 'auth-backend/ForgotPassword/services/ForgotPasswordCodeService';
import { MailerServiceMock } from 'auth-backend/__mock__/MailerServiceMock';

@Injectable()
export class ForgotPasswordService {
  public constructor(
    private readonly mailerService: MailerServiceMock,
    private readonly forgotPasswordCodeService: ForgotPasswordCodeService,
    private readonly i18nResolver: I18nResolver,
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

    const i18n = await this.i18nResolver.resolve();

    await this.mailerService.sendMail({
      to: user.email,
      subject: i18n.t('passwordRecovery'),
      text: i18n.t('toChangePassword', {
        args: {
          link: changePasswordUrl,
        },
      }),
    });
  }
}
