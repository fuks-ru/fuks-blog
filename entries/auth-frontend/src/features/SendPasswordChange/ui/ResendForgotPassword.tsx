import { styled } from '@linaria/react';
import { Button, Card, Space, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthApi } from 'auth-frontend/shared/api';
import { useRedirectFrom } from 'auth-frontend/entities/redirectFrom';
import { useDifferenceInterval } from 'auth-frontend/shared/lib/useDifferenceInterval';

interface IProps {
  email: string;
}

/**
 * Компонент для повторной отправки сообщения для смены пароля.
 */
export const ResendForgotPassword: FC<IProps> = ({ email }) => {
  const [sendForgotPassword, , status] = useAuthApi('forgotPasswordSend');
  const { t } = useTranslation();
  const redirectFrom = useRedirectFrom();

  const { secondsToNextSend, isRunning } = useDifferenceInterval({ status });

  const onResendClick = useCallback(async () => {
    if (isRunning) {
      return;
    }

    await sendForgotPassword({ email, redirectFrom });
  }, [email, isRunning, redirectFrom, sendForgotPassword]);

  return (
    <SCard title={t('passwordRecovery')}>
      <Space direction='vertical' size='small'>
        <Typography.Text>{t('changePasswordEmailSent')}</Typography.Text>
        <Button onClick={onResendClick} disabled={isRunning}>
          {isRunning ? t('resendAfter', { secondsToNextSend }) : t('send')}
        </Button>
      </Space>
    </SCard>
  );
};

const SCard = styled(Card)`
  max-width: 400px;
`;
