import { CommonModule } from '@difuks/common-backend';
import { isDevelopment } from '@difuks/constants';
import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { BlogBackendModule } from 'blog-frontend/server/BlogBackend/BlogBackendModule';
import { PagesModule } from 'blog-frontend/server/Pages/PagesModule';
import { ConfigGetter } from 'blog-frontend/server/Config/services/ConfigGetter';
import { ConfigModule } from 'blog-frontend/server/Config/ConfigModule';

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
    ConfigModule,
    CommonModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => ({
        statusResolver: configGetter.statusResolver,
        translations: configGetter.getTranslations(),
        errorPageName: '_500',
        domain: configGetter.getDomain(),
        apiPrefix: configGetter.getApiPrefix(),
      }),
    }),
    BlogBackendModule,
    PagesModule,
  ],
})
export class AppModule {}
