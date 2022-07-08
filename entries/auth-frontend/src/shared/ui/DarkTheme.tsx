import { FC } from 'react';

import { useDynamicStyleSheet } from 'auth-frontend/shared/lib/useDynamicStyleSheet';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import darkTheme from '!css-loader!antd/dist/antd.dark.css';

const DarkTheme: FC = () => {
  useDynamicStyleSheet(darkTheme.toString());

  return null;
};

/**
 * Темная тема.
 */
export default DarkTheme;
