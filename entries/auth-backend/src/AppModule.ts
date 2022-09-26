import { CONFIG, CommonModule } from '@difuks/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { MailerModule } from '@nestjs-modules/mailer';

import { AuthModule } from 'auth-backend/Auth/AuthModule';
import { BasicAuthModule } from 'auth-backend/BasicLogin/BasicAuthModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { GoogleLoginModule } from 'auth-backend/GoogleLogin/GoogleLoginModule';
import { RegisterModule } from 'auth-backend/Register/RegisterModule';
import { ForgotPasswordModule } from 'auth-backend/ForgotPassword/ForgotPasswordModule';
import { RoleModule } from 'auth-backend/Role/RoleModule';

@Module({
  imports: [
    CommonModule.forRoot(ConfigGetter),
    TypeOrmModule.forRootAsync({
      inject: [CONFIG],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
    GoogleLoginModule,
    RegisterModule,
    BasicAuthModule,
    AuthModule,
    MailerModule.forRootAsync({
      inject: [CONFIG],
      useFactory: (configGetter: ConfigGetter) => ({
        transport: configGetter.getMailerTransport(),
        defaults: {
          from: `"Fuks Blog" <${configGetter.getMailerFrom()}>`,
        },
      }),
    }),
    GoogleRecaptchaModule.forRootAsync({
      inject: [CONFIG],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getRecaptchaOptions(),
    }),
    ForgotPasswordModule,
    RoleModule,
  ],
})
export class AppModule {}
