import Link from 'next/link';

import { IIndexPageProps } from '@pages/../server/Index/dto/IIndexPageProps';
import { IPage } from '@common/types/page/IPage';
import { getSsp } from '@common/utils/next/getSsp';

const Index: IPage<IIndexPageProps> = ({ message }) => (
  <div>
    {message}
    <Link href='/categories'>To Categories</Link>
  </div>
);

export const getServerSideProps = getSsp();

/**
 * Главная страница.
 */
export default Index;
