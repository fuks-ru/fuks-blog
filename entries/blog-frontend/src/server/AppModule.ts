import { CommonModule } from '@difuks/common';
import { isDevelopment } from '@difuks/common/dist/constants';
import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { BlogBackendModule } from 'blog-frontend/server/BlogBackend/BlogBackendModule';
import { PagesModule } from 'blog-frontend/server/Pages/PagesModule';
import { ConfigGetter } from 'blog-frontend/server/Config/services/ConfigGetter';

@Module({
  imports: [
    CommonModule.forRoot(ConfigGetter),
    RenderModule.forRootAsync(
      Next({
        dev: isDevelopment,
        dir: process.cwd(),
      }),
      {
        viewsDir: '',
      },
    ),
    BlogBackendModule,
    PagesModule,
  ],
})
export class AppModule {}
