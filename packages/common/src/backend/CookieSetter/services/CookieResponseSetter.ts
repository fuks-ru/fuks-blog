import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { domainUrl } from 'common/constants';
import { CookieSetterRef } from 'common/backend/CookieSetter/services/CookieSetterRef';

@Injectable()
export class CookieResponseSetter {
  public constructor(private readonly cookieSetterRef: CookieSetterRef) {}

  /**
   * Устанавливает куку для ответа.
   */
  public set(response: Response): void {
    for (const [name, { value, options = {} }] of Object.entries(
      this.cookieSetterRef.getCookies(),
    )) {
      response.cookie(name, value, {
        ...options,
        domain: `.${domainUrl}`,
      });
    }
  }
}
