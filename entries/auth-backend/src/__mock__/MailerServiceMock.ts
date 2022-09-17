import { Injectable } from '@nestjs/common';
import { ISendMailOptions } from '@nestjs-modules/mailer';

@Injectable()
export class MailerServiceMock {
  /**
   * Моковый метод для отправки email.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public sendMail(sendMailOptions: ISendMailOptions): Promise<void> {
    return Promise.resolve();
  }
}
