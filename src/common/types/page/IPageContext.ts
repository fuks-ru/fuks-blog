import { NextPageContext } from 'next';

/**
 * Кастомный контекст для Next-страницы.
 */
export interface IPageContext<Props> extends Omit<NextPageContext, 'query'> {
  /**
   * Содержит пропсы, приходящие в next-компонент.
   */
  query: Props;
}
