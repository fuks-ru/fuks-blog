import { createContext } from 'react';

/**
 * Возможные темы.
 */
export type TTheme = 'light' | 'dark';

/**
 * Описание контекста темы.
 */
export interface IThemeContext {
  /**
   * Название темы.
   */
  theme: TTheme;
  /**
   * Метод для изменения темы.
   */
  toggleTheme: () => void;
}

/**
 * Контекст, тему.
 */
export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  toggleTheme: () => {
    // eslint-disable-next-line no-console
    console.warn('Theme provider not exists');
  },
});
