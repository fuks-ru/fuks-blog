import { IPageProps } from '@common/types/page/IPageProps';
import { ICategoryPageProps } from '@server/Categories/dto/ICategoryPageProps';

/**
 * Пропсы для главной страниы.
 */
export interface ICategoriesPageProps extends IPageProps {
  /**
   * Элементы категорий.
   */
  items: ICategoryPageProps[];
}
