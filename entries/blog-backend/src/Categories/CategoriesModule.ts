import { Module } from '@nestjs/common';

import { CategoryController } from './controllers/CategoryController';

@Module({
  controllers: [CategoryController],
})
export class CategoriesModule {}
