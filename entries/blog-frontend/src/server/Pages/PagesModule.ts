import { Module } from '@nestjs/common';

import { IndexController } from 'blog-frontend/pages/IndexController';
import { CategoryController } from 'blog-frontend/pages/categories/CategoryController';
import { CoreBackendModule } from 'blog-frontend/server/CoreBackend/CoreBackendModule';

@Module({
  imports: [CoreBackendModule],
  controllers: [IndexController, CategoryController],
})
export class PagesModule {}
