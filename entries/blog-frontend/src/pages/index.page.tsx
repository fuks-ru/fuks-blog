import { IPage } from 'blog-frontend/common/types/page/IPage';
import { getSsp } from 'blog-frontend/common/utils/next/getSsp';
import { IPageProps } from 'blog-frontend/common/types/page/IPageProps';

/**
 * Пропсы для главной страницы.
 */
export type IIndexPageProps = IPageProps;

const Index: IPage<IIndexPageProps> = () => (
  <div
    style={{
      display: 'flex',
      height: 50,
      paddingTop: 10,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div>Coming soon!</div>
    <div>
      Or send me telegram message:{' '}
      <a href='https://t.me/difuks' target='_blank' rel='noreferrer'>
        https://t.me/difuks
      </a>
    </div>
  </div>
);

export const getServerSideProps = getSsp();

/**
 * Главная страница.
 */
export default Index;
