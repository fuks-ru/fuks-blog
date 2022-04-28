import { BlogBackendModule } from '@difuks/api-blog-backend/dist/BlogBackendModule';
import {
  ValidationModule,
  LoggerModule,
  ErrorFilterModule,
  SystemErrorModule,
  ConfigModule,
  RedirectModule,
} from '@difuks/common';
import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { PagesModule } from 'blog-frontend/server/Pages/PagesModule';
import { ConfigGetter } from 'blog-frontend/server/Config/services/ConfigGetter';

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
    SystemErrorModule,
    LoggerModule,
    ErrorFilterModule,
    ConfigModule.forRoot(ConfigGetter),
    ValidationModule,
    BlogBackendModule,
    PagesModule,
    RedirectModule,
  ],
})
export class AppModule {}
