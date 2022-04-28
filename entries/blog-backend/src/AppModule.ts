import { AuthModule } from '@difuks/api-auth-backend/dist/AuthModule';
import {
  LoggerModule,
  SwaggerModule,
  ErrorFilterModule,
  SystemErrorModule,
  ValidationModule,
  ConfigModule,
  CONFIG,
} from '@difuks/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from 'blog-backend/Category/CategoryModule';
import { ConfigGetter } from 'blog-backend/Config/services/ConfigGetter';

@Module({
  imports: [
    SystemErrorModule,
    LoggerModule,
    ErrorFilterModule,
    ValidationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [CONFIG],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
    ConfigModule.forRoot(ConfigGetter),
    CategoryModule,
    SwaggerModule,
    AuthModule,
  ],
})
export class AppModule {}
