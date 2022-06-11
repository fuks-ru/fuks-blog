import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { CookieSetterRef } from 'common/backend/CookieSetter/services/CookieSetterRef';

@Injectable()
export class CookieResponseSetter {
  public constructor(private readonly cookieSetterRef: CookieSetterRef) {}

  public set(response: Response) {
    for (const [name, { value, options = {} }] of Object.entries(
      this.cookieSetterRef.getCookies(),
    )) {
      response.cookie(name, value, options);
    }
  }
}
