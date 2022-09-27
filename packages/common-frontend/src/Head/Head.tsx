import { FC, useEffect } from 'react';

interface IProps {
  title: string;
  lang: string;
}

/**
 * Компонент для отображения тега head.
 */
export const Head: FC<IProps> = ({ title, lang }) => {
  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement.lang = lang;

    return () => {
      htmlElement.lang = '';
    };
  }, [lang]);

  useEffect(() => {
    const headElement = document.head;
    const titleElement = document.createElement('title');

    titleElement.innerHTML = title;

    headElement.append(titleElement);

    return () => {
      titleElement.remove();
    };
  }, [title]);

  useEffect(() => {
    const headElement = document.head;
    const metaViewportElement = document.createElement('meta');

    metaViewportElement.name = 'viewport';
    metaViewportElement.content =
      'width=device-width, initial-scale=1, maximum-scale=1';

    headElement.append(metaViewportElement);

    return () => {
      metaViewportElement.remove();
    };
  }, []);

  return null;
};
