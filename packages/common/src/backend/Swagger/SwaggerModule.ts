import { Module } from '@nestjs/common';

import { SwaggerService } from 'common/backend/Swagger/services/SwaggerService';
import { ContractGenerator } from 'common/backend/Swagger/services/ContractGenerator';

@Module({
  providers: [SwaggerService, ContractGenerator],
  exports: [SwaggerService],
})
export class SwaggerModule {}
