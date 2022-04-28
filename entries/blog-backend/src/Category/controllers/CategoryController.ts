import { Public } from '@difuks/api-auth-backend/dist/decorators/Public';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Category } from 'blog-backend/Category/entities/Category';
import { CategoryService } from 'blog-backend/Category/services/CategoryService';

@Controller('/category')
@ApiTags('category')
export class CategoryController {
  public constructor(private readonly categoryService: CategoryService) {}

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
  @ApiParam({ name: 'id', required: true, schema: { type: 'string' } })
  public get(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getById(id);
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
  @Public()
  public list(): Promise<Category[]> {
    return this.categoryService.getList();
  }

  /**
   * Создает категорию.
   */
  @Post('/')
  @ApiCreatedResponse({
    type: Category,
    isArray: true,
  })
  @ApiOperation({
    operationId: 'categoryCreate',
  })
  public create(@Body() body: Category): Promise<Category> {
    return this.categoryService.create(body);
  }
}
