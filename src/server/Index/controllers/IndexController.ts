import { Body, Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IIndexPageProps } from '@server/Index/dto/IIndexPageProps';
import { TestSwaggerResponse } from '@server/Index/dto/TestSwaggerResponse';
import { TestSwaggerRequest } from '@server/Index/dto/TestSwaggerRequest';
import { Page } from '@server/Common/decorators/Page';
import { ApiPost } from '@server/Common/decorators/ApiPost';

@Controller()
@ApiTags('index')
export class IndexController {
  /**
   * Маршрут главной страницы.
   */
  @Page()
  public index(): IIndexPageProps {
    return { title: 'Главная страница', message: 'Hello world!' };
  }

  /**
   * Маршрут api-запроса.
   */
  @ApiPost('/test-swagger')
  @ApiCreatedResponse({
    type: TestSwaggerResponse,
  })
  @ApiOperation({
    operationId: 'indexTestSwagger',
  })
  public testSwagger(@Body() body: TestSwaggerRequest): TestSwaggerResponse {
    return {
      id: '1',
      test: body.name,
    };
  }
}
