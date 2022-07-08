import { useEffect } from 'react';

/**
 * Динамически задает таблицу стилей. При этом удаляет её при демонтировании.
 */
export const useDynamicStyleSheet = (styleSheet: string): void => {
  useEffect(() => {
    const styleElement = document.createElement('style');

    styleElement.innerHTML = styleSheet;

    document.head.append(styleElement);

    return () => {
      styleElement.remove();
    };
  }, [styleSheet]);
};
