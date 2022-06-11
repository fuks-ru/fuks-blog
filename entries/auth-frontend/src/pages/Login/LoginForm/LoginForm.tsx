import { styled } from '@linaria/react';
import { Button, Card, Form, Input, Row, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { css } from '@linaria/core';
import { Link } from 'react-router-dom';

import { useRedirectFromContext } from 'auth-frontend/hooks/useRedirectFrom';
import { useAuthForm } from 'auth-frontend/common/api';

export const LoginForm: FC = () => {
  const [form, onFinish] = useAuthForm('loginBasic');

  const redirectFrom = useRedirectFromContext();

  return (
    <Card title='Вход'>
      <Form form={form} initialValues={{ redirectFrom }} onFinish={onFinish}>
        <Form.Item name='redirectFrom' noStyle={true}>
          <Input hidden={true} readOnly={true} />
        </Form.Item>
        <Form.Item name='email'>
          <Input
            prefix={<UserOutlined className={opacityIcon} />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item name='password'>
          <Input
            prefix={<LockOutlined className={opacityIcon} />}
            type='password'
            placeholder='Пароль'
          />
        </Form.Item>
        <Form.Item noStyle={true}>
          <Button type='primary' htmlType='submit'>
            Войти
          </Button>
          <Typography.Text>
            {' '}
            или <Link to='/register'>регистрация</Link>
          </Typography.Text>
        </Form.Item>
      </Form>
    </Card>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
