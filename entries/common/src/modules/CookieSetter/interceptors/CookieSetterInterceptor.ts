import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { map } from 'rxjs/operators';
import { Response } from 'express';

import { CookieSetterRef } from 'common/modules/CookieSetter/services/CookieSetterRef';

@Injectable({ scope: Scope.REQUEST })
export class CookieSetterInterceptor implements NestInterceptor {
  public constructor(private readonly cookieSetterRef: CookieSetterRef) {}

  /**
   * Интерцептор для установки кук.
   */
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((payload: unknown) => {
        for (const [name, { value, options = {} }] of Object.entries(
          this.cookieSetterRef.responseCookie,
        )) {
          response.cookie(name, value, options);
        }

        return payload;
      }),
    );
  }
}
