import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import requestContext from 'request-context';

import { CookieResponseSetter } from 'common/backend/CookieSetter/services/CookieResponseSetter';
import { CookieSetterInterceptor } from 'common/backend/CookieSetter/interceptors/CookieSetterInterceptor';
import { CookieSetterRef } from 'common/backend/CookieSetter/services/CookieSetterRef';
import { CookieSetterService } from 'common/backend/CookieSetter/services/CookieSetterService';
import { REQUEST_CONTEXT_ID } from 'common/backend/CookieSetter/utils/constants';

@Global()
@Module({
  providers: [
    CookieSetterService,
    CookieSetterRef,
    CookieResponseSetter,
    {
      provide: APP_INTERCEPTOR,
      useClass: CookieSetterInterceptor,
    },
  ],
  exports: [CookieSetterService, CookieResponseSetter],
})
export class CookieSetterModule implements NestModule {
  /**
   * Регистрирует middleware, инициализирующий контекст для хранения кук.
   */
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(requestContext.middleware(REQUEST_CONTEXT_ID))
      .forRoutes('*');
  }
}
