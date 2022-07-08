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
 * Компонент для повторной отправки кода подтверждения.
 */
export const ResendConfirmEmail: FC<IProps> = ({ email }) => {
  const [resendConfirm, , status] = useAuthApi('registerResendConfirm');
  const { t } = useTranslation();
  const redirectFrom = useRedirectFrom();

  const { secondsToNextSend, isRunning } = useDifferenceInterval({ status });

  const onResendClick = useCallback(async () => {
    if (isRunning) {
      return;
    }

    await resendConfirm({ email, redirectFrom });
  }, [email, isRunning, redirectFrom, resendConfirm]);

  return (
    <SCard title={t('registration')}>
      <Space direction='vertical' size='small'>
        <Typography.Text>{t('confirmEmailSent')}</Typography.Text>
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
