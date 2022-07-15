import { Module } from '@nestjs/common';

import { RoleController } from 'auth-backend/Role/controllers/RoleController';

@Module({
  controllers: [RoleController],
})
export class RoleModule {}
