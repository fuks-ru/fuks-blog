import { Module } from '@nestjs/common';

import { EncodingModule } from 'auth-backend/Encoding/EncodingModule';
import { LoginModule } from 'auth-backend/Login/LoginModule';
import { RegisterController } from 'auth-backend/Register/controllers/RegisterController';
import { BasicRegisterService } from 'auth-backend/Register/services/BasicRegisterService';
import { EmailRegisterService } from 'auth-backend/Register/services/EmailRegisterService';
import { UserModule } from 'auth-backend/User/UserModule';

@Module({
  imports: [EncodingModule, UserModule, LoginModule],
  providers: [BasicRegisterService, EmailRegisterService],
  controllers: [RegisterController],
  exports: [EmailRegisterService],
})
export class RegisterModule {}
