import { Module } from '@nestjs/common';

import { IndexController } from 'blog-frontend/pages/IndexController';
import { CategoryController } from 'blog-frontend/pages/categories/CategoryController';

@Module({
  controllers: [IndexController, CategoryController],
})
export class PagesModule {}
