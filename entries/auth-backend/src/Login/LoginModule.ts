import { CONFIG, ConfigModule } from '@difuks/common/dist';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { LoginController } from 'auth-backend/Login/contollers/LoginController';
import { LoginService } from 'auth-backend/Login/services/LoginService';
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
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
