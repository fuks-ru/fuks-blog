import { I18nResolver } from '@difuks/common/dist';
import { urls } from '@difuks/common/dist/constants';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import qs from 'qs';

import { User } from 'auth-backend/User/entities/User';
import { ConfirmCodeService } from 'auth-backend/Register/modules/EmailVerify/services/ConfirmCodeService';

@Injectable()
export class EmailVerifyService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly confirmCodeService: ConfirmCodeService,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Отправляет код подтверждения пользователю.
   */
  public async send(
    user: User,
    redirectFrom: string = urls.BLOG_FRONTEND_URL,
  ): Promise<void> {
    const confirmCode = await this.confirmCodeService.addConfirmCodeToUser(
      user,
      redirectFrom,
    );

    const confirmUrl = `${urls.AUTH_FRONTEND_URL}/confirm-email?${qs.stringify({
      confirmCode: confirmCode.value,
    })}`;

    const i18n = await this.i18nResolver.resolve();

    await this.mailerService.sendMail({
      to: user.email,
      subject: i18n.t('welcome'),
      text: i18n.t('toConfirm', {
        args: {
          link: confirmUrl,
        },
      }),
    });
  }
}
