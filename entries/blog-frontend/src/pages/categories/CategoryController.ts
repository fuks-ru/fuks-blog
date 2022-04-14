import { Controller } from '@nestjs/common';

import type { ICategoriesPageProps } from 'blog-frontend/pages/categories/index.page';
import type { ICategoryPageProps } from 'blog-frontend/pages/categories/[id]/index.page';
import { Page } from 'blog-frontend/server/Common/decorators/Page';
import { CoreBackendService } from 'blog-frontend/server/CoreBackend/services/CoreBackendService';

@Controller()
export class CategoryController {
  public constructor(private readonly coreBackend: CoreBackendService) {}

  /**
   * Маршрут списка категорий.
   */
  @Page('categories')
  public async index(): Promise<ICategoriesPageProps> {
    const response = await this.coreBackend.getClient().categoryList();

    return { title: 'Категории', items: response.data };
  }

  /**
   * Маршрут детальное страницы.
   */
  @Page('categories/[id]')
  public async detail(): Promise<ICategoryPageProps> {
    const response = await this.coreBackend.getClient().categoryGet({ id: 2 });

    return { title: 'Категории / Hello', ...response.data };
  }
}
