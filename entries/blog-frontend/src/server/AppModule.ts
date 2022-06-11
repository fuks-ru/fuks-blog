import { BlogBackendModule } from '@difuks/api-blog-backend/dist/backend';
import {
  ValidationModule,
  LoggerModule,
  ErrorFilterModule,
  SystemErrorModule,
  ConfigModule,
  RedirectModule,
  CookieSetterModule,
  RequestRefModule,
} from '@difuks/common';
import { isDevelopment } from '@difuks/common/dist/constants';
import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { PagesModule } from 'blog-frontend/server/Pages/PagesModule';
import { ConfigGetter } from 'blog-frontend/server/Config/services/ConfigGetter';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: isDevelopment,
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
    CookieSetterModule,
    RequestRefModule,
  ],
})
export class AppModule {}
