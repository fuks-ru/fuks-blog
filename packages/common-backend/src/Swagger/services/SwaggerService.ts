import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { ContractGenerator } from 'common-backend/Swagger/services/ContractGenerator';

@Injectable()
export class SwaggerService {
  public constructor(private readonly contractGenerator: ContractGenerator) {}

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
   * Генерирует api-контракты в файл.
   */
  public async generateApiContract(document: OpenAPIObject): Promise<void> {
    await this.contractGenerator.generateContractLib(document);
  }

  /**
   * Создает маршрут для просмотра swagger-схемы в браущере.
   */
  public setupRoute(
    path: string,
    app: INestApplication,
    document: OpenAPIObject,
  ): void {
    SwaggerModule.setup(path, app, document);
  }
}
