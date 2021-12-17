import { IPage } from '@common/types/page/IPage';
import { IPageProps } from '@common/types/page/IPageProps';
import { getSsp } from '@common/utils/next/getSsp';

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
