import { Injectable, Scope } from '@nestjs/common';
import { CookieOptions } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class CookieSetterRef {
  /**
   * Хранилище всех кук, которые нужны отдать клиенту.
   */
  public readonly responseCookie: Record<
    string,
    {
      /**
       * Значение куки.
       */
      value: string;
      /**
       * Параметры куки.
       */
      options?: CookieOptions;
    }
  > = {};

  /**
   * Установить куку.
   */
  public setCookie(name: string, value: string, options?: CookieOptions): void {
    this.responseCookie[name] = { value, options };
  }
}
