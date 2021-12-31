import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { ICategoriesPageProps } from '@fuks/blog-frontend/src/pages/categories/index.page';
import type { ICategoryPageProps } from '@fuks/blog-frontend/src/pages/categories/[id]/index.page';

import { Page } from '../../../Common/decorators/Page';

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