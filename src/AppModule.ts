import { Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';

import { IndexModule } from '@server/Index/IndexModule';
import { CategoriesModule } from '@server/Categories/CategoriesModule';
import { ErrorFilterModule } from '@app/server/ErrorFilter/ErrorFilterModule';
import { SystemErrorModule } from '@app/server/SystemError/SystemErrorModule';
import { LoggerModule } from '@server/Logger/LoggerModule';
import { ConfigModule } from '@server/Config/ConfigModule';
import { CommonModule } from '@server/Common/CommonModule';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({ dev: process.env.NODE_ENV !== 'production', dir: process.cwd() }),
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
