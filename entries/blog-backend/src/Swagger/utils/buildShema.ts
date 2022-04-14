import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { load } from 'dotenv-extended';
import path from 'node:path';

import { ConfigGetter } from 'blog-backend/Config/services/ConfigGetter';
import { ConfigModule } from 'blog-backend/Config/ConfigModule';
import { AppModule } from 'blog-backend/AppModule';
import { SwaggerService } from 'blog-backend/Swagger/services/SwaggerService';
import { SwaggerModule } from 'blog-backend/Swagger/SwaggerModule';

load({
  path: path.join(process.cwd(), '.env.local'),
  defaults: path.join(process.cwd(), '.env'),
});

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerService = app.select(SwaggerModule).get(SwaggerService);
  const configGetter = app.select(ConfigModule).get(ConfigGetter);

  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument(app);

  swaggerService.writeToFile(document);
})();
