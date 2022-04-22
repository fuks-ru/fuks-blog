import { Module } from '@nestjs/common';

import { GoogleAuthController } from 'auth-backend/GoogleAuth/controllers/GoogleAuthController';
import { GoogleAuth } from 'auth-backend/GoogleAuth/services/GoogleAuth';
import { GoogleAuthStrategy } from 'auth-backend/GoogleAuth/strategies/GoogleAuthStrategy';
import { LoginModule } from 'auth-backend/Login/LoginModule';
import { RegisterModule } from 'auth-backend/Register/RegisterModule';
import { UserModule } from 'auth-backend/User/UserModule';

@Module({
  imports: [UserModule, RegisterModule, LoginModule],
  providers: [GoogleAuth, GoogleAuthStrategy],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}
