import { Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import path from 'node:path';

import { SystemErrorModule } from '@blog-backend/SystemError/SystemErrorModule';
import { LoggerModule } from '@blog-backend/Logger/LoggerModule';
import { CategoriesModule } from '@blog-backend/Pages/Categories/CategoriesModule';
import { ConfigModule } from '@blog-backend/Config/ConfigModule';
import { CommonModule } from '@blog-backend/Common/CommonModule';
import { IndexModule } from '@blog-backend/Pages/Index/IndexModule';
import { ErrorFilterModule } from '@blog-backend/ErrorFilter/ErrorFilterModule';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: path.join(process.cwd(), '../blog-frontend'),
      }),
      {
        viewsDir: '',
      },
    ),
    IndexModule,
    CategoriesModule,
    SystemErrorModule,
    ErrorFilterModule,
    LoggerModule,
    ConfigModule,
    CommonModule,
  ],
})
export class AppModule {}
