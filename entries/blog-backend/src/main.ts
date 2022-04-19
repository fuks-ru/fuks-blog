import { NestFactory } from '@nestjs/core';
import { SwaggerModule as BaseSwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

import { SwaggerService } from 'blog-backend/Swagger/services/SwaggerService';
import { SwaggerModule } from 'blog-backend/Swagger/SwaggerModule';
import { AppModule } from 'blog-backend/AppModule';
import { ConfigModule } from 'blog-backend/Config/ConfigModule';
import { ConfigGetter } from 'blog-backend/Config/services/ConfigGetter';

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

  const document = swaggerService.createDocument(app);

  BaseSwaggerModule.setup(configGetter.getApiPrefix(), app, document);

  if (configGetter.isDev()) {
    swaggerService.writeToFile(document);
  }

  await app.listen(3_001);
})();
