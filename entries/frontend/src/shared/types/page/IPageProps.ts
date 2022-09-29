/**
 * Описание ошибки.
 */
export interface IErrorData {
  /**
   * Сообщение.
   */
  message: string;
}

/**
 * Описывает базовые пропсы для страницы.
 */
export interface IPageProps {
  /**
   * Заголовок страницы.
   */
  title?: string;
  /**
   * Возвращается в случае ошибки.
   */
  error?: IErrorData;
}
