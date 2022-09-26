import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CONFIG, SwaggerService } from '@difuks/common';

import { AppModule } from 'auth-backend/AppModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerService = app.get(SwaggerService);
  const configGetter = await app.resolve<ConfigGetter>(CONFIG);

  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument('Fuks block auth', app);

  await swaggerService.generateApiContract(document);
})();
