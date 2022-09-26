import { CONFIG, CommonModule } from '@difuks/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'blog-backend/Auth/AuthModule';
import { CategoryModule } from 'blog-backend/Category/CategoryModule';
import { ConfigGetter } from 'blog-backend/Config/services/ConfigGetter';

@Module({
  imports: [
    CommonModule.forRoot(ConfigGetter),
    TypeOrmModule.forRootAsync({
      inject: [CONFIG],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
    CategoryModule,
    AuthModule,
  ],
})
export class AppModule {}
