import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';

import { CoreBackendService } from 'blog-frontend/server/CoreBackend/services/CoreBackendService';
import { CoreBackendModule } from 'blog-frontend/server/CoreBackend/CoreBackendModule';
import { AppModule } from 'blog-frontend/server/AppModule';
import { ConfigModule } from 'blog-frontend/server/Config/ConfigModule';
import { ConfigGetter } from 'blog-frontend/server/Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configGetter = app.select(ConfigModule).get(ConfigGetter);
  const coreBackendService = app
    .select(CoreBackendModule)
    .get(CoreBackendService);

  app.use(cookieParser());

  app.useStaticAssets(path.join(process.cwd(), 'public'));

  await coreBackendService.init();

  await app.listen(configGetter.getEnv('BFF_PORT'));
})();
