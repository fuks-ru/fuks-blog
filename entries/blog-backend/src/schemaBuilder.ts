import { SwaggerModule, SwaggerService, CONFIG } from '@difuks/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ConfigGetter } from 'blog-backend/Config/services/ConfigGetter';
import { AppModule } from 'blog-backend/AppModule';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerService = app.select(SwaggerModule).get(SwaggerService);
  const configGetter = await app.resolve<ConfigGetter>(CONFIG);

  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument('Fuks block backend', app);

  await swaggerService.generateApiContract(document);
})();
