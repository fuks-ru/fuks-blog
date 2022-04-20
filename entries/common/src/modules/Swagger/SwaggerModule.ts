import { Module } from '@nestjs/common';

import { SwaggerService } from 'common/modules/Swagger/services/SwaggerService';

@Module({
  providers: [SwaggerService],
})
export class SwaggerModule {}
