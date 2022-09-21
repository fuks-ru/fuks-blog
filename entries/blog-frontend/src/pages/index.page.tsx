import styled from 'styled-components';

import { IPage } from 'blog-frontend/shared/types/page/IPage';
import { getSsp } from 'blog-frontend/shared/lib/next/getSsp';
import { IPageProps } from 'blog-frontend/shared/types/page/IPageProps';

/**
 * Пропсы для главной страницы.
 */
export type IIndexPageProps = IPageProps;

const Index: IPage<IIndexPageProps> = () => (
  <SWrapper>
    <div>Coming soon!</div>
    <div>
      Or send me telegram message:{' '}
      <a href='https://t.me/difuks' target='_blank' rel='noreferrer'>
        https://t.me/difuks
      </a>
    </div>
  </SWrapper>
);

const SWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-family: sans-serif;
  color: #e8d8d8;
  line-height: 50px;
  font-size: 25px;
  height: 100%;
  text-align: center;
`;

export const getServerSideProps = getSsp();

/**
 * Главная страница.
 */
export default Index;
