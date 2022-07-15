import { Button, Card, Form, Input, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { css } from '@linaria/core';
import { Trans, useTranslation } from 'react-i18next';

import { useAuthForm } from 'auth-frontend/shared/api';
import { useRedirectFrom } from 'auth-frontend/entities/redirectFrom';
import { Link } from 'auth-frontend/shared/ui/Link';

/**
 * Форма входа.
 */
export const LoginEmailPassword: FC = () => {
  const [form, onFinish, status] = useAuthForm('loginBasic');
  const { t } = useTranslation();

  const redirectFrom = useRedirectFrom();

  return (
    <Card title={t('login')}>
      <Form form={form} initialValues={{ redirectFrom }} onFinish={onFinish}>
        <Form.Item name='redirectFrom' noStyle={true}>
          <Input hidden={true} readOnly={true} />
        </Form.Item>
        <Form.Item name='email'>
          <Input
            prefix={<UserOutlined className={opacityIcon} />}
            placeholder={t('email')}
          />
        </Form.Item>
        <Form.Item name='password'>
          <Input
            prefix={<LockOutlined className={opacityIcon} />}
            type='password'
            placeholder={t('password')}
          />
        </Form.Item>
        <Form.Item>
          <Trans t={t} i18nKey='loginOrRegister'>
            <Button
              type='primary'
              htmlType='submit'
              disabled={status === 'pending'}
            >
              Login
            </Button>
            or
            <Link route='registration'>registration</Link>
          </Trans>
        </Form.Item>
        <Form.Item noStyle={true}>
          <Typography.Text>
            <Link route='forgotPassword'>{t('forgotPassword')}</Link>
          </Typography.Text>
        </Form.Item>
      </Form>
    </Card>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
