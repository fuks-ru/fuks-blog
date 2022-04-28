import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from 'api-auth-backend/Auth/guards/AuthBackendGuard';
import { AuthBackendStrategy } from 'api-auth-backend/Auth/strategies/AuthBackendStrategy';

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
