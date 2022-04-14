import { Module } from '@nestjs/common';

import { SwaggerService } from 'blog-backend/Swagger/services/SwaggerService';

@Module({
  providers: [SwaggerService],
})
export class SwaggerModule {}
