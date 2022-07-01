import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from 'auth-backend/User/controllers/UserController';
import { User } from 'auth-backend/User/entities/User';
import { UserService } from 'auth-backend/User/services/UserService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
