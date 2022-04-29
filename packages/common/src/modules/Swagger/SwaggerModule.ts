import { Module } from '@nestjs/common';

import { SwaggerService } from 'common/modules/Swagger/services/SwaggerService';
import { ContractGenerator } from 'common/modules/Swagger/services/ContractGenerator';

@Module({
  providers: [SwaggerService, ContractGenerator],
  exports: [SwaggerService],
})
export class SwaggerModule {}
