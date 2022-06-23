import { createContext, useContext } from 'react';

/**
 * Возможные темы.
 */
export type TTheme = 'light' | 'dark';

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

/**
 * Контекст, тему.
 */
export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * Хук, получающий тему.
 */
export const useTheme = (): IThemeContext => useContext(ThemeContext);
