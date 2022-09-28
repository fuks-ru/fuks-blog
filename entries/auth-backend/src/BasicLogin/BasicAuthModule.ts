import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { BasicLoginController } from 'auth-backend/BasicLogin/controllers/BasicLoginController';
import { BasicLoginService } from 'auth-backend/BasicLogin/services/BasicLoginService';
import { BasicLoginStrategy } from 'auth-backend/BasicLogin/strategies/BasicLoginStrategy';
import { LoginModule } from 'auth-backend/Login/LoginModule';
import { UserModule } from 'auth-backend/User/UserModule';

@Module({
  imports: [UserModule, EncodingModule, LoginModule],
  providers: [BasicLoginService, BasicLoginStrategy],
  controllers: [BasicLoginController],
})
export class BasicAuthModule {}
