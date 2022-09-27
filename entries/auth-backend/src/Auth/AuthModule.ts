import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AuthGuard } from 'auth-backend/Auth/guards/AuthGuard';
import { RolesGuard } from 'auth-backend/Auth/guards/RolesGuard';
import { AuthStrategy } from 'auth-backend/Auth/strategies/AuthStrategy';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { AuthController } from 'auth-backend/Auth/contollers/AuthController';
import { AuthService } from 'auth-backend/Auth/services/AuthService';
import { UserModule } from 'auth-backend/User/UserModule';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => configGetter.getJwtConfig(),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
