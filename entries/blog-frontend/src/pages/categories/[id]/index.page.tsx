import Link from 'next/link';

import { IPage } from 'blog-frontend/common/types/page/IPage';
import { getSsp } from 'blog-frontend/common/utils/next/getSsp';
import { IPageProps } from 'blog-frontend/common/types/page/IPageProps';

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

const Category: IPage<ICategoryPageProps> = ({ id, name }) => (
  <div>
    {id} - {name}
    <Link href='/?a=3'>To main</Link>
    <Link href='/categories'>To categories</Link>
  </div>
);

export const getServerSideProps = getSsp();

/**
 * Детальная страница категории.
 */
export default Category;
