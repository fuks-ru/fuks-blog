import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { LoggerModule } from '@difuks/common';
import Next from 'next';

import { PagesModule } from 'blog-frontend/server/Pages/PagesModule';
import { CoreBackendModule } from 'blog-frontend/server/CoreBackend/CoreBackendModule';
import { SystemErrorModule } from 'blog-frontend/server/SystemError/SystemErrorModule';
import { ConfigModule } from 'blog-frontend/server/Config/ConfigModule';
import { ErrorFilterModule } from 'blog-frontend/server/ErrorFilter/ErrorFilterModule';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: process.cwd(),
      }),
      {
        viewsDir: '',
      },
    ),
    ConfigModule,
    SystemErrorModule,
    ErrorFilterModule,
    LoggerModule,
    CoreBackendModule,
    PagesModule,
  ],
})
export class AppModule {}
