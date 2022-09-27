import { Global, Module } from '@nestjs/common';

import { SwaggerService } from 'common-backend/Swagger/services/SwaggerService';
import { ContractGenerator } from 'common-backend/Swagger/services/ContractGenerator';

@Global()
@Module({
  providers: [SwaggerService, ContractGenerator],
  exports: [SwaggerService],
})
export class SwaggerModule {}
