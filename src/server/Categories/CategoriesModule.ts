import { Module } from '@nestjs/common';

import { CategoryController } from '@server/Categories/controllers/CategoryController';

@Module({
  controllers: [CategoryController],
})
export class CategoriesModule {}
