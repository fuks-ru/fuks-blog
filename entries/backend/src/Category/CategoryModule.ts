import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from 'backend/Category/controllers/CategoryController';
import { Category } from 'backend/Category/entities/Category';
import { CategoryService } from 'backend/Category/services/CategoryService';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
