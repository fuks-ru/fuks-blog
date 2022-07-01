import { CONFIG, ConfigModule } from '@difuks/common/dist';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AuthGuard } from 'auth-backend/Auth/guards/AuthGuard';
import { AuthStrategy } from 'auth-backend/Auth/strategies/AuthStrategy';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { AuthController } from 'auth-backend/Auth/contollers/AuthController';
import { AuthService } from 'auth-backend/Auth/services/AuthService';
import { UserModule } from 'auth-backend/User/UserModule';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot(ConfigGetter)],
      inject: [CONFIG],
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
  ],
})
export class AuthModule {}
