import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
import { Button, Form, Input, Card } from 'antd';
import { FC, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { useAuthForm } from 'auth-frontend/shared/api';
import { ResendConfirmEmail } from 'auth-frontend/features/Register/ui/ResendConfirmEmail';
import { useRedirectFrom } from 'auth-frontend/entities/redirectFrom';
import { Link } from 'auth-frontend/shared/ui/Link';

/**
 * Форма регистрации.
 */
export const Register: FC = () => {
  const [form, onFinish, status] = useAuthForm('registerBasic');
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>();

  const redirectFrom = useRedirectFrom();

  if (status === 'success' && email) {
    return <ResendConfirmEmail email={email} />;
  }

  return (
    <Card title={t('registration')}>
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
            placeholder={t('email')}
            prefix={<UserOutlined className={opacityIcon} />}
          />
        </Form.Item>
        <Form.Item name='password'>
          <Input
            type='password'
            placeholder={t('password')}
            prefix={<LockOutlined className={opacityIcon} />}
          />
        </Form.Item>
        <Form.Item name='repeatPassword'>
          <Input
            type='password'
            placeholder={t('repeatPassword')}
            prefix={<LockOutlined className={opacityIcon} />}
          />
        </Form.Item>
        <Form.Item noStyle={true}>
          <Trans t={t} i18nKey='registerOrLogin'>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              disabled={status === 'pending'}
            >
              Register
            </Button>
            or<Link route='login'>login</Link>
          </Trans>
        </Form.Item>
      </Form>
    </Card>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
