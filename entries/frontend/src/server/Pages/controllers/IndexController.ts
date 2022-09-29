import { Controller } from '@nestjs/common';

import type { IIndexPageProps } from 'frontend/pages/index.page';
import { Page } from 'frontend/server/Pages/decorators/Page';

@Controller()
export class IndexController {
  /**
   * Маршрут главной страницы.
   */
  @Page()
  public index(): IIndexPageProps {
    return {
      title: 'Fuks blog',
    };
  }
}
