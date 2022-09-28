import { Injectable } from '@nestjs/common';
import { IRedirectData } from '@fuks-ru/common';

import { RedirectError } from 'common-backend/Redirect/dto/RedirectError';

@Injectable()
export class RedirectErrorFactory {
  /**
   * Создает объект ошибки для редиректа.
   */
  public create(data: IRedirectData): RedirectError {
    return new RedirectError(data);
  }
}
