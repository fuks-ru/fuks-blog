import { BlogBackendService } from '@difuks/api-blog-backend/dist/backend';
import { Controller, Param } from '@nestjs/common';

import type { ICategoriesPageProps } from 'blog-frontend/pages/categories/index.page';
import type { ICategoryPageProps } from 'blog-frontend/pages/categories/[id]/index.page';
import { Page } from 'blog-frontend/server/Pages/decorators/Page';

@Controller()
export class CategoryController {
  public constructor(private readonly coreBackend: BlogBackendService) {}

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
  public async detail(@Param('id') id: string): Promise<ICategoryPageProps> {
    const response = await this.coreBackend.getClient().categoryGet({ id });

    return { title: 'Категории / Hello', ...response.data };
  }
}
