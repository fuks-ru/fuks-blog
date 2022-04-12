import { FC } from 'react';

interface IProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children?: string;
}

/**
 * Компонент кнопки.
 */
export const Button: FC<IProps> = ({ size = 'md', onClick, children }) => (
  <button onClick={onClick} type='button'>
    {size} {children}
  </button>
);
