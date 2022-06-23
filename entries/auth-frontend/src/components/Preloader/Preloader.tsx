import { styled } from '@linaria/react';
import { Spin } from 'antd';
import { FC } from 'react';

/**
 * Отображает прелоадер.
 */
export const Preloader: FC = () => (
  <SWrapper>
    <Spin size='large' />
  </SWrapper>
);

const SWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
