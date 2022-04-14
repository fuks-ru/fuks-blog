import { Controller, Get } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Category } from 'blog-backend/Category/dto/Category';

@Controller('/category')
@ApiTags('category')
export class CategoryController {
  /**
   * Возвращает конкретную категорию.
   */
  @Get('/:id')
  @ApiCreatedResponse({
    type: Category,
  })
  @ApiOperation({
    operationId: 'categoryGet',
  })
  @ApiParam({ name: 'id', required: true, schema: { type: 'number' } })
  public get(): Category {
    return {
      id: '1',
      name: 'Первая категория',
    };
  }

  /**
   * Возвращает список категорий.
   */
  @Get('/')
  @ApiCreatedResponse({
    type: Category,
    isArray: true,
  })
  @ApiOperation({
    operationId: 'categoryList',
  })
  public list(): Category[] {
    return [
      {
        id: '1',
        name: 'Первая категория',
      },
      {
        id: '2',
        name: 'Вторая категория',
      },
    ];
  }
}
