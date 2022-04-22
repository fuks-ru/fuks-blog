import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, SwaggerService } from '@difuks/common/dist';

import { AppModule } from 'auth-backend/AppModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';
import { ConfigModule } from 'auth-backend/Config/ConfigModule';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerService = app.select(SwaggerModule).get(SwaggerService);
  const configGetter = app.select(ConfigModule).get(ConfigGetter);

  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument('Fuks block auth', app);

  await swaggerService.generateApiContract(document);
})();
