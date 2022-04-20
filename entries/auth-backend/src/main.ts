import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, SwaggerService } from '@difuks/common';

import { AppModule } from 'auth-backend/AppModule';
import { ConfigModule } from 'auth-backend/Config/ConfigModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: 'http://localhost:3002',
      credentials: true,
    },
  });
  const configGetter = app.select(ConfigModule).get(ConfigGetter);
  const swaggerService = app.select(SwaggerModule).get(SwaggerService);

  app.use(cookieParser());
  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument('Fuks auth', app);

  swaggerService.setupRoute(configGetter.getApiPrefix(), app, document);

  if (configGetter.isDev()) {
    void swaggerService.generateApiContract(document);
  }

  await app.listen(configGetter.getApiPort());
})();
