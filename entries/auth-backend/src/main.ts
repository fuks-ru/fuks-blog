import { CONFIG, SwaggerModule, SwaggerService } from '@difuks/common';
import { urls } from '@difuks/common/dist/constants';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from 'auth-backend/AppModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: urls.AUTH_FRONTEND_URL,
      credentials: true,
    },
  });

  const configGetter = await app.resolve<ConfigGetter>(CONFIG);
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
