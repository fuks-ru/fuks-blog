import { CommonModule } from '@fuks-ru/common-backend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'backend/Auth/AuthModule';
import { CategoryModule } from 'backend/Category/CategoryModule';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { ConfigModule } from 'backend/Config/ConfigModule';

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
