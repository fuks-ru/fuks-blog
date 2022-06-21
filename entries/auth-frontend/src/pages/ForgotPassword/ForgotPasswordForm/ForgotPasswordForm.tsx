import { FC, useState } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
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

  if (status === 'success' && email) {
    return <ResendForgotPassword email={email} />;
  }

  return (
    <Card title='Восстановление пароля'>
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
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item noStyle={true}>
          <Button type='primary' htmlType='submit'>
            Отправить
          </Button>
          <Typography.Text>
            {' '}
            или <Link to='/'>войти</Link>
          </Typography.Text>
        </Form.Item>
      </Form>
    </Card>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
