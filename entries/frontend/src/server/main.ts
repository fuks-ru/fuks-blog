import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ConfigGetter } from 'frontend/server/Config/services/ConfigGetter';
import { AppModule } from 'frontend/server/AppModule';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configGetter = app.get(ConfigGetter);

  app.use(cookieParser());

  app.useStaticAssets(path.join(process.cwd(), 'public'));

  await app.listen(configGetter.getApiPort());
})();
