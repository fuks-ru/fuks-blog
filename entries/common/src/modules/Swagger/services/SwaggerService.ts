import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import fs from 'node:fs';
import path from 'node:path';

@Injectable()
export class SwaggerService {
  /**
   * Создает документ для Swagger схемы.
   */
  public createDocument(name: string, app: INestApplication): OpenAPIObject {
    const config = new DocumentBuilder()
      .setTitle(name)
      .setVersion('1.0')
      .addServer('/')
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
