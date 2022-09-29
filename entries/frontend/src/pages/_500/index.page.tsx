import { IPage } from 'frontend/shared/types/page/IPage';
import { getSsp } from 'frontend/shared/lib/next/getSsp';
import { IPageProps } from 'frontend/shared/types/page/IPageProps';

/**
 * Переиспользуется в _app для отображения ошибки в процессе spa запроса
 * страницы.
 */
export const ErrorPage: IPage<IPageProps> = ({ error }) => (
  <div style={{ background: 'red' }}>Произошла ошибка: {error?.message}</div>
);

export const getServerSideProps = getSsp();

/**
 * Страница ошибки.
 */
export default ErrorPage;
