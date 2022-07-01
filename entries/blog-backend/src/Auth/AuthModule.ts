import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from 'blog-backend/Auth/guards/AuthBackendGuard';
import { AuthBackendStrategy } from 'blog-backend/Auth/strategies/AuthBackendStrategy';

@Global()
@Module({
  providers: [
    AuthBackendStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
