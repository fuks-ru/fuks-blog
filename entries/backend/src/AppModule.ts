import { CommonModule } from '@fuks-ru/common-backend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'blog-backend/Auth/AuthModule';
import { CategoryModule } from 'blog-backend/Category/CategoryModule';
import { ConfigGetter } from 'blog-backend/Config/services/ConfigGetter';
import { ConfigModule } from 'blog-backend/Config/ConfigModule';

@Module({
  imports: [
    ConfigModule,
    CommonModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => ({
        statusResolver: configGetter.statusResolver,
        translations: configGetter.getTranslations(),
        domain: configGetter.getDomain(),
        apiPrefix: configGetter.getApiPrefix(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
    CategoryModule,
    AuthModule,
  ],
})
export class AppModule {}
