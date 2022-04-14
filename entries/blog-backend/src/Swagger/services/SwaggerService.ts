import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import fs from 'node:fs';
import path from 'node:path';

import { ConfigGetter } from 'blog-backend/Config/services/ConfigGetter';

@Injectable()
export class SwaggerService {
  public constructor(private readonly configGetter: ConfigGetter) {}

  /**
   * Создает документ для Swagger схемы.
   */
  public createDocument(app: INestApplication): OpenAPIObject {
    const config = new DocumentBuilder()
      .setTitle('Fuks Blog')
      .setVersion('1.0')
      .addServer(this.configGetter.getFullHost())
      .build();

    return SwaggerModule.createDocument(app, config);
  }

  /**
   * Записывает схему в файл.
   */
  public writeToFile(document: OpenAPIObject): void {
    fs.writeFileSync(
      path.join(process.cwd(), '/lib/swagger-schema.json'),
      JSON.stringify(document),
    );
  }
}
