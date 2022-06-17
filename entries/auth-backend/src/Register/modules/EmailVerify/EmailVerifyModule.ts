import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfirmationController } from 'auth-backend/Register/modules/EmailVerify/controllers/ConfirmationController';
import { ConfirmCode } from 'auth-backend/Register/modules/EmailVerify/entities/ConfirmCode';
import { ConfirmationService } from 'auth-backend/Register/modules/EmailVerify/services/ConfirmationService';
import { ConfirmCodeService } from 'auth-backend/Register/modules/EmailVerify/services/ConfirmCodeService';
import { EmailVerifyService } from 'auth-backend/Register/modules/EmailVerify/services/EmailVerifyService';
import { LoginModule } from 'auth-backend/Login/LoginModule';
import { UserModule } from 'auth-backend/User/UserModule';

@Module({
  imports: [TypeOrmModule.forFeature([ConfirmCode]), UserModule, LoginModule],
  providers: [EmailVerifyService, ConfirmCodeService, ConfirmationService],
  controllers: [ConfirmationController],
  exports: [EmailVerifyService],
})
export class EmailVerifyModule {}
