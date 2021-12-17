import Link from 'next/link';

import { IPage } from '@common/types/page/IPage';
import { getSsp } from '@common/utils/next/getSsp';
import { ICategoriesPageProps } from '@server/Categories/dto/ICategoriesPageProps';

const Categories: IPage<ICategoriesPageProps> = ({ items }) => (
  <div>
    <Link href='/?a=3'>To main</Link>
    {items.map((item) => (
      <Link key={item.id} href={`/categories/${item.id}`}>
        <a>To {item.name}</a>
      </Link>
    ))}
  </div>
);

export const getServerSideProps = getSsp();

/**
 * Страница списка категория.
 */
export default Categories;
