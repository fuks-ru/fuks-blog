import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ICategoriesPageProps } from '@server/Categories/dto/ICategoriesPageProps';
import { ICategoryPageProps } from '@server/Categories/dto/ICategoryPageProps';
import { Page } from '@server/Common/decorators/Page';

@Controller()
@ApiTags('categories')
export class CategoryController {
  /**
   * Маршрут списка категорий.
   */
  @Page('categories')
  public index(): ICategoriesPageProps {
    return { title: 'Категории', items: [{ id: '123', name: 'Hello' }] };
  }

  /**
   * Маршрут детальное страницы.
   */
  @Page('categories/[id]')
  public detail(): ICategoryPageProps {
    return { title: 'Категории / Hello', id: '123', name: 'Hello' };
  }
}
