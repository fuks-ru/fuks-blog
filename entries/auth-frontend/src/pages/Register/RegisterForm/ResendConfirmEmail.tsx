import { styled } from '@linaria/react';
import { Button, Card, Space, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthApi } from 'auth-frontend/utils/api';
import { useRedirectFromContext } from 'auth-frontend/hooks/useRedirectFrom';
import { useDifferenceInterval } from 'auth-frontend/hooks/useDifferenceInterval';

interface IProps {
  email: string;
}

/**
 * Компонент для повторной отправки кода подтверждения.
 */
export const ResendConfirmEmail: FC<IProps> = ({ email }) => {
  const [resendConfirm, , status] = useAuthApi('registerResendConfirm');
  const { t } = useTranslation();

  const redirectFrom = useRedirectFromContext();

  const { humanTimeout, isRunning } = useDifferenceInterval({ status });

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
          {isRunning
            ? t('confirmEmailResend', { timeout: humanTimeout })
            : t('send')}
        </Button>
      </Space>
    </SCard>
  );
};

const SCard = styled(Card)`
  max-width: 400px;
`;
