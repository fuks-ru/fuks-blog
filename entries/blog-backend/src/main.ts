import { CONFIG, SwaggerModule, SwaggerService } from '@difuks/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from 'blog-backend/AppModule';
import { ConfigGetter } from 'blog-backend/Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configGetter = await app.resolve<ConfigGetter>(CONFIG);
  const swaggerService = app.select(SwaggerModule).get(SwaggerService);

  app.use(cookieParser());
  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument('Fuks blog backend', app);

  swaggerService.setupRoute(configGetter.getApiPrefix(), app, document);

  if (configGetter.isDev()) {
    void swaggerService.generateApiContract(document);
  }

  await app.listen(configGetter.getApiPort());
})();
