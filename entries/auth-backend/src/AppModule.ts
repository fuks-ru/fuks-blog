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
  I18nModule,
} from '@difuks/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';

import { AuthModule } from 'auth-backend/Auth/AuthModule';
import { BasicAuthModule } from 'auth-backend/BasicLogin/BasicAuthModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { GoogleLoginModule } from 'auth-backend/GoogleLogin/GoogleLoginModule';
import { RegisterModule } from 'auth-backend/Register/RegisterModule';
import { ForgotPasswordModule } from 'auth-backend/ForgotPassword/ForgotPasswordModule';
import { RoleModule } from 'auth-backend/Role/RoleModule';

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
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [CONFIG],
    //   useFactory: (configGetter: ConfigGetter) => ({
    //     transport: configGetter.getMailerTransport(),
    //     defaults: {
    //       from: `"Fuks Blog" <${configGetter.getMailerFrom()}>`,
    //     },
    //   }),
    // }),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [CONFIG],
      // TODO https://github.com/chvarkov/google-recaptcha/issues/99
      useFactory: (configGetter: unknown) =>
        (configGetter as ConfigGetter).getRecaptchaOptions(),
    }),
    ForgotPasswordModule,
    I18nModule,
    RoleModule,
  ],
})
export class AppModule {}
