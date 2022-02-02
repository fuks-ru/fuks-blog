import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './AppModule';
import { ConfigModule } from './Config/ConfigModule';
import { ConfigGetter } from './Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configGetter = app.select(ConfigModule).get(ConfigGetter);

  app.use(cookieParser());

  app.useStaticAssets(path.join(process.cwd(), 'public'));

  const config = new DocumentBuilder()
    .setTitle('Fuks Blog')
    .setVersion('1.0')
    .addServer(configGetter.getFullHost())
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(configGetter.getApiPrefix(), app, document);

  await app.listen(configGetter.getEnv('SERVER_PORT'));
})();
