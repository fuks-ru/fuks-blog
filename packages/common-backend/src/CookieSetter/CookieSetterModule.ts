import {
  DynamicModule,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import requestContext from 'request-context';

import { CookieResponseSetter } from 'common-backend/CookieSetter/services/CookieResponseSetter';
import { CookieSetterInterceptor } from 'common-backend/CookieSetter/interceptors/CookieSetterInterceptor';
import { CookieSetterRef } from 'common-backend/CookieSetter/services/CookieSetterRef';
import { CookieSetterService } from 'common-backend/CookieSetter/services/CookieSetterService';
import { REQUEST_CONTEXT_ID } from 'common-backend/CookieSetter/utils/constants';
import {
  ICookieSetterModuleAsyncOptions,
  ICookieSetterModuleOptions,
} from 'common-backend/CookieSetter/types/ICookieSetterModuleOptions';

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
   * Регистрирует модуль.
   */
  public static forRoot(options: ICookieSetterModuleOptions): DynamicModule {
    return {
      module: CookieSetterModule,
      global: true,
      providers: [
        CookieSetterService,
        CookieSetterRef,
        CookieResponseSetter,
        {
          provide: APP_INTERCEPTOR,
          useClass: CookieSetterInterceptor,
        },
        {
          provide: 'COOKIE_SETTER_OPTIONS',
          useValue: options,
        },
      ],
      exports: [CookieSetterService, CookieResponseSetter],
    };
  }

  /**
   * Регистрирует модуль асинхронно.
   */
  public static forRootAsync(
    options: ICookieSetterModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: CookieSetterModule,
      global: true,
      imports: options.imports,
      providers: [
        CookieSetterService,
        CookieSetterRef,
        CookieResponseSetter,
        {
          provide: APP_INTERCEPTOR,
          useClass: CookieSetterInterceptor,
        },
        {
          provide: 'COOKIE_SETTER_OPTIONS',
          inject: options.inject,
          useFactory: options.useFactory,
        },
      ],
      exports: [CookieSetterService, CookieResponseSetter],
    };
  }

  /**
   * Регистрирует middleware, инициализирующий контекст для хранения кук.
   */
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(requestContext.middleware(REQUEST_CONTEXT_ID))
      .forRoutes('*');
  }
}
