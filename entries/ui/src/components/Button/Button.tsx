import { FC } from 'react';

interface IProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

/**
 * Компонент кнопки.
 */
export const Button: FC<IProps> = ({ size = 'md', onClick }) => (
  <button onClick={onClick} type='button'>
    {size}
  </button>
);
