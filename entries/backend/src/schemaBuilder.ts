import { SwaggerService } from '@fuks-ru/common-backend';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { AppModule } from 'backend/AppModule';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerService = app.get(SwaggerService);
  const configGetter = app.get(ConfigGetter);

  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument('Fuks block backend', app);

  await swaggerService.generateApiContract(document);
})();
