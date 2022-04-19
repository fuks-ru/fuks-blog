import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';

import { BFF_PORT } from 'blog-frontend/common/utils/constants';
import { CoreBackendService } from 'blog-frontend/server/CoreBackend/services/CoreBackendService';
import { CoreBackendModule } from 'blog-frontend/server/CoreBackend/CoreBackendModule';
import { AppModule } from 'blog-frontend/server/AppModule';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const coreBackendService = app
    .select(CoreBackendModule)
    .get(CoreBackendService);

  app.use(cookieParser());

  app.useStaticAssets(path.join(process.cwd(), 'public'));

  await coreBackendService.init();

  await app.listen(BFF_PORT);
})();
