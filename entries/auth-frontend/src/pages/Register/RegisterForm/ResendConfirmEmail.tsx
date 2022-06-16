import { styled } from '@linaria/react';
import { Button, Card, Space, Typography } from 'antd';
import { FC } from 'react';

import { useConfirmResendInterval } from 'auth-frontend/pages/Register/RegisterForm/hooks/useConfirmResendInterval';

interface IProps {
  email: string;
}

/**
 * Компонент для повторной отправки кода подтверждения.
 */
export const ResendConfirmEmail: FC<IProps> = ({ email }) => {
  const { onResendClick, isRunning, humanTimeout } = useConfirmResendInterval({
    email,
  });

  return (
    <SCard title='Регистрация'>
      <Space direction='vertical' size='small'>
        <Typography.Text>
          Письмо с кодом подтверждения отправлено вам на email. Код не пришел?
        </Typography.Text>
        <Button onClick={onResendClick} disabled={isRunning}>
          {isRunning ? <>До повторной отправки {humanTimeout}</> : 'Отправить'}
        </Button>
      </Space>
    </SCard>
  );
};

const SCard = styled(Card)`
  max-width: 400px;
`;
