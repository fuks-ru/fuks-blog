import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncodingModule } from '@fuks-ru/common-backend';

import { ForgotPasswordCode } from 'auth-backend/ForgotPassword/entities/ForgotPasswordCode';
import { ForgotPasswordService } from 'auth-backend/ForgotPassword/services/ForgotPasswordService';
import { ForgotPasswordCodeService } from 'auth-backend/ForgotPassword/services/ForgotPasswordCodeService';
import { UserModule } from 'auth-backend/User/UserModule';
import { ChangePasswordService } from 'auth-backend/ForgotPassword/services/ChangePasswordService';
import { ForgotPasswordController } from 'auth-backend/ForgotPassword/controllers/ForgotPasswordController';

@Module({
  imports: [
    TypeOrmModule.forFeature([ForgotPasswordCode]),
    EncodingModule,
    UserModule,
  ],
  providers: [
    ForgotPasswordService,
    ForgotPasswordCodeService,
    ChangePasswordService,
  ],
  controllers: [ForgotPasswordController],
})
export class ForgotPasswordModule {}
