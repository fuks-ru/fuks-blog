import { Module, ValidationPipe } from '@nestjs/common';
import {
  LoggerModule,
  SwaggerModule,
  CookieSetterModule,
} from '@difuks/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BasicAuthModule } from 'auth-backend/BasicAuth/BasicAuthModule';
import { ConfigModule } from 'auth-backend/Config/ConfigModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { ErrorFilterModule } from 'auth-backend/ErrorFilter/ErrorFilterModule';
import { GoogleAuthModule } from 'auth-backend/GoogleAuth/GoogleAuthModule';
import { RegisterModule } from 'auth-backend/Register/RegisterModule';
import { SystemErrorModule } from 'auth-backend/SystemError/SystemErrorModule';

@Module({
  imports: [
    SystemErrorModule,
    ErrorFilterModule,
    LoggerModule,
    ConfigModule,
    GoogleAuthModule,
    SwaggerModule,
    RegisterModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
    CookieSetterModule,
    BasicAuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
