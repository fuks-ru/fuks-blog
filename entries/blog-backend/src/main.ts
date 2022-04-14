import { NestFactory } from '@nestjs/core';
import { SwaggerModule as BaseSwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { load } from 'dotenv-extended';
import * as path from 'node:path';

import { SwaggerService } from 'blog-backend/Swagger/services/SwaggerService';
import { SwaggerModule } from 'blog-backend/Swagger/SwaggerModule';
import { AppModule } from 'blog-backend/AppModule';
import { ConfigModule } from 'blog-backend/Config/ConfigModule';
import { ConfigGetter } from 'blog-backend/Config/services/ConfigGetter';

load({
  path: path.join(process.cwd(), '.env.local'),
  defaults: path.join(process.cwd(), '.env'),
});

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configGetter = app.select(ConfigModule).get(ConfigGetter);
  const swaggerService = app.select(SwaggerModule).get(SwaggerService);

  app.use(cookieParser());
  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument(app);

  BaseSwaggerModule.setup(configGetter.getApiPrefix(), app, document);

  if (configGetter.isDev()) {
    swaggerService.writeToFile(document);
  }

  await app.listen(configGetter.getEnv('SERVER_PORT'));
})();
