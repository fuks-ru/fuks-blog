import { styled } from '@linaria/react';
import { Button, Card, Space, Typography } from 'antd';
import { FC, useCallback } from 'react';

import { useAuthApi } from 'auth-frontend/utils/api';
import { useRedirectFromContext } from 'auth-frontend/hooks/useRedirectFrom';
import { useDifferenceInterval } from 'auth-frontend/hooks/useDifferenceInterval';

interface IProps {
  email: string;
}

/**
 * Компонент для повторной отправки сообщения для смены пароля.
 */
export const ResendForgotPassword: FC<IProps> = ({ email }) => {
  const [sendForgotPassword, , status] = useAuthApi('forgotPasswordSend');

  const redirectFrom = useRedirectFromContext();

  const { humanTimeout, isRunning } = useDifferenceInterval({ status });

  const onResendClick = useCallback(async () => {
    if (isRunning) {
      return;
    }

    await sendForgotPassword({ email, redirectFrom });
  }, [email, isRunning, redirectFrom, sendForgotPassword]);

  return (
    <SCard title='Восстановление пароля'>
      <Space direction='vertical' size='small'>
        <Typography.Text>
          Письмо с ссылкой на смену пароля отправлено вам на email. Письмо не
          пришло?
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
