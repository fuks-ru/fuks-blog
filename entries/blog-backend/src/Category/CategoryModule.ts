import { Module } from '@nestjs/common';

import { CategoryController } from 'blog-backend/Category/controllers/CategoryController';

@Module({
  controllers: [CategoryController],
})
export class CategoryModule {}
