import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';

import { CookieSetterRef } from 'common-backend/CookieSetter/services/CookieSetterRef';
import { ICookieSetterModuleOptions } from 'common-backend/CookieSetter/types/ICookieSetterModuleOptions';

@Injectable()
export class CookieResponseSetter {
  public constructor(
    private readonly cookieSetterRef: CookieSetterRef,
    @Inject('COOKIE_SETTER_OPTIONS')
    private readonly options: ICookieSetterModuleOptions,
  ) {}

  /**
   * Устанавливает куку для ответа.
   */
  public set(response: Response): void {
    for (const [name, { value, options = {} }] of Object.entries(
      this.cookieSetterRef.getCookies(),
    )) {
      response.cookie(name, value, {
        domain: options.domain,
        ...options,
      });
    }
  }
}
