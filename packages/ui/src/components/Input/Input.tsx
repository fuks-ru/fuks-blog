import { FC } from 'react';

interface IProps {
  value?: string;
}

/**
 * Компонент инпута.
 */
export const Input: FC<IProps> = ({ value }) => <input value={value} />;
