import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { CookieSetterInterceptor } from 'common/modules/CookieSetter/interceptors/CookieSetterInterceptor';
import { CookieSetterRef } from 'common/modules/CookieSetter/services/CookieSetterRef';
import { CookieSetterService } from 'common/modules/CookieSetter/services/CookieSetterService';

@Global()
@Module({
  providers: [
    CookieSetterService,
    CookieSetterRef,
    {
      provide: APP_INTERCEPTOR,
      useClass: CookieSetterInterceptor,
    },
  ],
  exports: [CookieSetterService],
})
export class CookieSetterModule {}
