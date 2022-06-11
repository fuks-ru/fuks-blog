import {
  CONFIG,
  LoggerModule,
  SwaggerModule,
  CookieSetterModule,
  SystemErrorModule,
  ValidationModule,
  ErrorFilterModule,
  ConfigModule,
  RequestRefModule,
  RedirectModule,
} from '@difuks/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth-backend/Auth/AuthModule';

import { BasicAuthModule } from 'auth-backend/BasicLogin/BasicAuthModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { GoogleLoginModule } from 'auth-backend/GoogleLogin/GoogleLoginModule';
import { RegisterModule } from 'auth-backend/Register/RegisterModule';

@Module({
  imports: [
    SystemErrorModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [CONFIG],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
    ErrorFilterModule,
    ConfigModule.forRoot(ConfigGetter),
    GoogleLoginModule,
    SwaggerModule,
    RegisterModule,
    CookieSetterModule,
    BasicAuthModule,
    ValidationModule,
    RedirectModule,
    RequestRefModule,
    AuthModule,
  ],
})
export class AppModule {}
