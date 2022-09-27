import { EnvGetter, SwaggerService } from '@difuks/common-backend';
import { urls } from '@difuks/constants';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from 'auth-backend/AppModule';
import { ConfigGetter } from 'auth-backend/Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: [urls.AUTH_FRONTEND_URL, urls.ADMIN_FRONTEND_URL],
      credentials: true,
    },
  });

  const configGetter = app.get(ConfigGetter);
  const envGetter = app.get(EnvGetter);
  const swaggerService = app.get(SwaggerService);

  app.use(cookieParser());
  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument('Fuks auth', app);

  swaggerService.setupRoute(configGetter.getApiPrefix(), app, document);

  if (envGetter.isDev()) {
    void swaggerService.generateApiContract(document);
  }

  await app.listen(configGetter.getApiPort());
})();
