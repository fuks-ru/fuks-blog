import { Module } from '@nestjs/common';

import { CategoryController } from '@blog-backend/Pages/Categories/controllers/CategoryController';

@Module({
  controllers: [CategoryController],
})
export class CategoriesModule {}
