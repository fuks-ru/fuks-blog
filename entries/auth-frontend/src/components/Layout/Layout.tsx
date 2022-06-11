import { FC, ReactNode } from 'react';
import 'normalize.css';
import 'antd/dist/antd.css';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

interface IProps {
  children: ReactNode;
}

/**
 * Компонент шаблона.
 */
export const Layout: FC<IProps> = ({ children }) => (
  <SLayout>{children}</SLayout>
);

const SLayout = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Глобальные стили.
 *
 * @see https://github.com/callstack/linaria/blob/master/docs/BASICS.md#adding-global-styles
 */
export const globals = css`
  :global() {
    html {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
    }

    body {
      height: 100%;
      width: 100%;
      font-weight: 300;
    }

    * {
      box-sizing: border-box;
    }
  }
`;
