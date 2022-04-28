import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from 'blog-backend/Category/controllers/CategoryController';
import { Category } from 'blog-backend/Category/entities/Category';
import { CategoryService } from 'blog-backend/Category/services/CategoryService';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
