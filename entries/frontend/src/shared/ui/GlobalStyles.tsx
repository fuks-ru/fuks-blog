import { createGlobalStyle } from 'styled-components';
import { FC } from 'react';
import { Normalize } from 'styled-normalize';

const GlobalStyleBase = createGlobalStyle`
  body {
    background: #181414;
  }
  
  html, body, #__next {
    height: 100%;
  }
`;

/**
 * Глобальные стили приложения.
 */
export const GlobalStyle: FC = () => (
  <>
    <Normalize />
    <GlobalStyleBase />
  </>
);
