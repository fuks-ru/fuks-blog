import { Module } from '@nestjs/common';
import { LoggerModule, SwaggerModule } from '@difuks/common';

import { CategoryModule } from 'blog-backend/Category/CategoryModule';
import { ConfigModule } from 'blog-backend/Config/ConfigModule';
import { ErrorFilterModule } from 'blog-backend/ErrorFilter/ErrorFilterModule';
import { SystemErrorModule } from 'blog-backend/SystemError/SystemErrorModule';

@Module({
  imports: [
    SystemErrorModule,
    ErrorFilterModule,
    LoggerModule,
    ConfigModule,
    CategoryModule,
    SwaggerModule,
  ],
})
export class AppModule {}
