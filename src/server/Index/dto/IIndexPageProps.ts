import { IPageProps } from '@common/types/page/IPageProps';

/**
 * Пропсы для главной страницы.
 */
export interface IIndexPageProps extends IPageProps {
  /**
   * Сообщения для отображения.
   */
  message: string;
}
