import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { map } from 'rxjs/operators';
import { Response } from 'express';

import { CookieResponseSetter } from 'common-backend/CookieSetter/services/CookieResponseSetter';

@Injectable()
export class CookieSetterInterceptor implements NestInterceptor {
  public constructor(
    private readonly cookieResponseSetter: CookieResponseSetter,
  ) {}

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
        this.cookieResponseSetter.set(response);

        return payload;
      }),
    );
  }
}
