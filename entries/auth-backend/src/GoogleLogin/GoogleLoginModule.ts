import { Module } from '@nestjs/common';

import { GoogleLoginController } from 'auth-backend/GoogleLogin/controllers/GoogleLoginController';
import { GoogleLoginAuth } from 'auth-backend/GoogleLogin/services/GoogleLoginAuth';
import { GoogleLoginStrategy } from 'auth-backend/GoogleLogin/strategies/GoogleLoginStrategy';
import { LoginModule } from 'auth-backend/Login/LoginModule';
import { RegisterModule } from 'auth-backend/Register/RegisterModule';
import { UserModule } from 'auth-backend/User/UserModule';

@Module({
  imports: [UserModule, RegisterModule, LoginModule],
  providers: [GoogleLoginAuth, GoogleLoginStrategy],
  controllers: [GoogleLoginController],
})
export class GoogleLoginModule {}
