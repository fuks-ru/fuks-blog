import { IPage } from '../../common/types/page/IPage';
import { getSsp } from '../../common/utils/next/getSsp';
import { IPageProps } from '../../common/types/page/IPageProps';

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
