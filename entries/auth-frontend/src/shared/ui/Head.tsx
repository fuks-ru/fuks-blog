import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Head as HeadBase } from '@fuks-ru/common-frontend';

interface IProps {
  title: string;
}

/**
 * Компонент для отображения тега head.
 */
export const Head: FC<IProps> = ({ title }) => {
  const { t, i18n } = useTranslation();

  return <HeadBase title={t('authTitle', { title })} lang={i18n.language} />;
};
