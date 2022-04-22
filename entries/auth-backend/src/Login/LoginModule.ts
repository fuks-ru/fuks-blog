import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from 'auth-backend/Config/ConfigModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { LoginService } from 'auth-backend/Login/services/LoginService';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => ({
        secret: configGetter.getJwtSecret(),
      }),
    }),
  ],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
