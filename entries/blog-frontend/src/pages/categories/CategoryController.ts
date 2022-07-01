import { Controller, Param } from '@nestjs/common';

import type { ICategoriesPageProps } from 'blog-frontend/pages/categories/index.page';
import type { ICategoryPageProps } from 'blog-frontend/pages/categories/[id]/index.page';
import { BlogBackendService } from 'blog-frontend/server/BlogBackend/services/BlogBackendService';
import { Page } from 'blog-frontend/server/Pages/decorators/Page';

@Controller()
export class CategoryController {
  public constructor(private readonly coreBackend: BlogBackendService) {}

  /**
   * Маршрут списка категорий.
   */
  @Page('categories')
  public async index(): Promise<ICategoriesPageProps> {
    const response = await this.coreBackend.client.categoryList();

    return { title: 'Категории', items: response.data };
  }

  /**
   * Маршрут детальной страницы.
   */
  @Page('categories/[id]')
  public async detail(@Param('id') id: string): Promise<ICategoryPageProps> {
    const response = await this.coreBackend.client.categoryGet({ id });

    return { title: 'Категории / Hello', ...response.data };
  }
}
