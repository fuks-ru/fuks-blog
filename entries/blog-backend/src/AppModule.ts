import { Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import path from 'node:path';

import { SystemErrorModule } from './SystemError/SystemErrorModule';
import { LoggerModule } from './Logger/LoggerModule';
import { CategoriesModule } from './Categories/CategoriesModule';
import { ConfigModule } from './Config/ConfigModule';
import { CommonModule } from './Common/CommonModule';
import { IndexModule } from './Index/IndexModule';
import { ErrorFilterModule } from './ErrorFilter/ErrorFilterModule';

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
