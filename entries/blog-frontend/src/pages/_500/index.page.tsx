import { IPage } from '@blog-frontend/common/types/page/IPage';
import { getSsp } from '@blog-frontend/common/utils/next/getSsp';
import { IPageProps } from '@blog-frontend/common/types/page/IPageProps';

/**
 * Переиспользуется в _app для отображения ошибки в процессе spa запроса страницы.
 */
export const ErrorPage: IPage<IPageProps> = ({ error }) => (
  <div style={{ background: 'red' }}>Произошла ошибка: {error?.message}</div>
);

export const getServerSideProps = getSsp();

/**
 * Страница ошибки.
 */
export default ErrorPage;
