import { SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { Category } from 'backend/Category/entities/Category';

@Injectable()
export class CategoryService {
  public constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  /**
   * Получает категорию по id.
   */
  public async getById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      id,
    });

    if (!category) {
      throw this.systemErrorFactory.create(
        ErrorCode.CATEGORY_NOT_FOUND,
        `Категория с id ${id} не найдена`,
      );
    }

    return category;
  }

  /**
   * Создает категорию.
   */
  public create(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  /**
   * Получает массив категорий.
   */
  public getList(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
