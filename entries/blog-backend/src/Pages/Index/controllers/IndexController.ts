import { Body, Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IIndexPageProps } from '@fuks/blog-frontend/src/pages/index.page';

import { TestSwaggerRequest } from 'blog-backend/Pages/Index/dto/TestSwaggerRequest';
import { TestSwaggerResponse } from 'blog-backend/Pages/Index/dto/TestSwaggerResponse';
import { Page } from 'blog-backend/Common/decorators/Page';
import { ApiPost } from 'blog-backend/Common/decorators/ApiPost';

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
