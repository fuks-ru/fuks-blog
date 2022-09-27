import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';
import requestContext from 'request-context';

import {
  COOKIE,
  REQUEST_CONTEXT_ID,
} from 'common-backend/CookieSetter/utils/constants';

type ICookie = Record<
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
>;

/**
 * Контекст запроса.
 */
interface IRequestContext {
  /**
   * Id сессии.
   */
  [COOKIE]?: ICookie;
}

@Injectable()
export class CookieSetterRef {
  /**
   * Установить куку.
   */
  public setCookie(name: string, value: string, options?: CookieOptions): void {
    const context = requestContext.get<IRequestContext>(REQUEST_CONTEXT_ID);

    requestContext.set(`${REQUEST_CONTEXT_ID}:${COOKIE}`, {
      ...context,
      [name]: { value, options },
    });
  }

  /**
   * Получить куки.
   */
  public getCookies(): ICookie {
    const context = requestContext.get<IRequestContext>(REQUEST_CONTEXT_ID);

    return context[COOKIE] || {};
  }
}
