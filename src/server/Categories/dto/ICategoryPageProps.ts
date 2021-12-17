import { IPageProps } from '@common/types/page/IPageProps';

/**
 * Пропсы для детальной страницы категории.
 */
export interface ICategoryPageProps extends IPageProps {
  /**
   * ID.
   */
  id: string;
  /**
   * Название.
   */
  name: string;
}
