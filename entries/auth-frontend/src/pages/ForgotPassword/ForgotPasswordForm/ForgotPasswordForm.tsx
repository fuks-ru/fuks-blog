import { FC, useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAuthForm } from 'auth-frontend/utils/api';
import { useRedirectFromContext } from 'auth-frontend/hooks/useRedirectFrom';
import { ResendForgotPassword } from 'auth-frontend/pages/ForgotPassword/ForgotPasswordForm/ResendForgotPassword';

/**
 * Форма восстановления пароля.
 */
export const ForgotPasswordForm: FC = () => {
  const [form, onFinish, status] = useAuthForm('forgotPasswordSend');
  const [email, setEmail] = useState<string>();
  const redirectFrom = useRedirectFromContext();
  const { t } = useTranslation();

  if (status === 'success' && email) {
    return <ResendForgotPassword email={email} />;
  }

  return (
    <Card title={t('passwordRecovery')}>
      <Form
        form={form}
        initialValues={{ redirectFrom }}
        onFinish={async (body) => {
          await onFinish(body);

          setEmail(body.email);
        }}
      >
        <Form.Item name='redirectFrom' noStyle={true}>
          <Input hidden={true} readOnly={true} />
        </Form.Item>
        <Form.Item name='email'>
          <Input
            prefix={<UserOutlined className={opacityIcon} />}
            placeholder={t('email')}
          />
        </Form.Item>
        <Form.Item noStyle={true}>
          <Trans t={t} i18nKey='sendOrLogin'>
            <Button type='primary' htmlType='submit'>
              Send
            </Button>
            or<Link to='/'>enter</Link>
          </Trans>
        </Form.Item>
      </Form>
    </Card>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
