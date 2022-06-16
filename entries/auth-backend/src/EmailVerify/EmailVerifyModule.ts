import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfirmationController } from 'auth-backend/EmailVerify/controllers/ConfirmationController';
import { ConfirmCode } from 'auth-backend/EmailVerify/entities/ConfirmCode';
import { ConfirmationService } from 'auth-backend/EmailVerify/services/ConfirmationService';
import { ConfirmCodeService } from 'auth-backend/EmailVerify/services/ConfirmCodeService';
import { EmailVerifyService } from 'auth-backend/EmailVerify/services/EmailVerifyService';
import { LoginModule } from 'auth-backend/Login/LoginModule';
import { UserModule } from 'auth-backend/User/UserModule';

@Module({
  imports: [TypeOrmModule.forFeature([ConfirmCode]), UserModule, LoginModule],
  providers: [EmailVerifyService, ConfirmCodeService, ConfirmationService],
  controllers: [ConfirmationController],
  exports: [EmailVerifyService],
})
export class EmailVerifyModule {}
