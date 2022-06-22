import { FC, ReactNode } from 'react';
import 'normalize.css';
import 'antd/dist/antd.css';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { LocaleSwitch } from 'auth-frontend/components/LocaleSwitch/LocaleSwitch';

interface IProps {
  children: ReactNode;
}

/**
 * Компонент шаблона.
 */
export const Layout: FC<IProps> = ({ children }) => (
  <>
    <SHeader>
      <LocaleSwitch />
    </SHeader>
    <SMain>{children}</SMain>
  </>
);

const SHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 0;
`;

const SMain = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
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
      font-weight: 300;
    }

    * {
      box-sizing: border-box;
    }

    #app {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;
