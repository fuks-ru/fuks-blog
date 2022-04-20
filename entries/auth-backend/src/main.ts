import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';

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

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(cookieParser());
  app.setGlobalPrefix(configGetter.getApiPrefix());

  await app.listen(configGetter.getApiPort());
})();
