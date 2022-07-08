import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { styled } from '@linaria/react';
import { Segmented } from 'antd';
import { FC } from 'react';

import { useTheme } from 'auth-frontend/entities/theme';

/**
 * Компонент для смены темы.
 */
export const ThemeSwitch: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Segmented
      options={[
        {
          label: (
            <SIconWrapper>
              <BulbOutlined />
            </SIconWrapper>
          ),
          value: 'dark',
        },
        {
          label: (
            <SIconWrapper>
              <BulbFilled />
            </SIconWrapper>
          ),
          value: 'light',
        },
      ]}
      defaultValue={theme}
      onChange={toggleTheme}
    />
  );
};

const SIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
`;
