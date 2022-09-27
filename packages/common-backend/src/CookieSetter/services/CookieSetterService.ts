import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';

import { CookieSetterRef } from 'common-backend/CookieSetter/services/CookieSetterRef';

@Injectable()
export class CookieSetterService {
  public constructor(private readonly cookieSetterRef: CookieSetterRef) {}

  /**
   * Установить куку.
   */
  public setCookie(name: string, value: string, options?: CookieOptions): void {
    this.cookieSetterRef.setCookie(name, value, options);
  }
}
