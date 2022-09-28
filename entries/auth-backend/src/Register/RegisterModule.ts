import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { EmailVerifyModule } from 'auth-backend/Register/modules/EmailVerify/EmailVerifyModule';
import { RegisterController } from 'auth-backend/Register/controllers/RegisterController';
import { BasicRegisterService } from 'auth-backend/Register/services/BasicRegisterService';
import { EmailRegisterService } from 'auth-backend/Register/services/EmailRegisterService';
import { UserModule } from 'auth-backend/User/UserModule';

@Module({
  imports: [EncodingModule, UserModule, EmailVerifyModule],
  providers: [BasicRegisterService, EmailRegisterService],
  controllers: [RegisterController],
  exports: [EmailRegisterService],
})
export class RegisterModule {}
