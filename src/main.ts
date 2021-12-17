import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '@app/AppModule';
import { ConfigModule } from '@server/Config/ConfigModule';
import { ConfigGetter } from '@server/Config/services/ConfigGetter';
import { API_PREFIX } from '@common/utils/constants';

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

  SwaggerModule.setup(API_PREFIX, app, document);

  await app.listen(configGetter.get('SERVER_PORT'));
})();
