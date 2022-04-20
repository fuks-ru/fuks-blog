import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiOkResponse,
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
  @ApiOkResponse({
    type: Category,
  })
  @ApiOperation({
    operationId: 'categoryGet',
  })
  @ApiParam({ name: 'id', required: true, schema: { type: 'number' } })
  public get(@Param('id', ParseIntPipe) id: number): Category {
    return {
      id,
      name: 'Первая категория',
    };
  }

  /**
   * Возвращает список категорий.
   */
  @Get('/')
  @ApiOkResponse({
    type: Category,
    isArray: true,
  })
  @ApiOperation({
    operationId: 'categoryList',
  })
  public list(): Category[] {
    return [
      {
        id: 1,
        name: 'Первая категория',
      },
      {
        id: 2,
        name: 'Вторая категория',
      },
    ];
  }
}
