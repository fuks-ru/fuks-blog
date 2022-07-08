import {
  FC,
  lazy,
  ReactNode,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from 'react';

import { ThemeContext, TTheme } from 'auth-frontend/entities/theme';

const LightTheme = lazy(() => import('auth-frontend/shared/ui/LightTheme'));
const DarkTheme = lazy(() => import('auth-frontend/shared/ui/DarkTheme'));

interface IProps {
  children: ReactNode;
}

const lsKey = 'theme';

/**
 * Провайдер, предоставляющий контекст для получения темы.
 */
export const ThemeProvider: FC<IProps> = ({ children }) => {
  const [theme = 'light', setTheme] = useState<TTheme>(() => {
    const lsValue = localStorage.getItem(lsKey);

    if (lsValue === 'dark') {
      return 'dark';
    }

    return 'light';
  });
  const [, startTransition] = useTransition();

  const toggleTheme = useCallback(() => {
    startTransition(() => {
      setTheme((value) => {
        const nextValue = value === 'light' ? 'dark' : 'light';

        localStorage.setItem(lsKey, nextValue);

        return nextValue;
      });
    });
  }, [setTheme]);

  const context = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={context}>
      {theme === 'light' ? <LightTheme /> : <DarkTheme />}
      {children}
    </ThemeContext.Provider>
  );
};
