import {
  CONFIG,
  LoggerModule,
  SwaggerModule,
  CookieSetterModule,
  SystemErrorModule,
  ValidationModule,
  ErrorFilterModule,
  ConfigModule,
} from '@difuks/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BasicAuthModule } from 'auth-backend/BasicAuth/BasicAuthModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { GoogleAuthModule } from 'auth-backend/GoogleAuth/GoogleAuthModule';
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
    GoogleAuthModule,
    SwaggerModule,
    RegisterModule,
    CookieSetterModule,
    BasicAuthModule,
    ValidationModule,
  ],
})
export class AppModule {}
