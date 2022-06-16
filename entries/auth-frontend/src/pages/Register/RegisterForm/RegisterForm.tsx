import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
import { Button, Form, Input, Card, Typography } from 'antd';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { ResendConfirmEmail } from 'auth-frontend/pages/Register/RegisterForm/ResendConfirmEmail';
import { useAuthForm } from 'auth-frontend/common/api';

/**
 * Форма регистрации.
 */
export const RegisterForm: FC = () => {
  const [form, onFinish, status] = useAuthForm('registerBasic');

  const [email, setEmail] = useState<string>();

  if (status === 'success' && email) {
    return <ResendConfirmEmail email={email} />;
  }

  return (
    <Card title='Регистрация'>
      <Form
        form={form}
        onFinish={async (body) => {
          await onFinish(body);

          setEmail(body.email);
        }}
      >
        <Form.Item name='email'>
          <Input
            placeholder='Email'
            prefix={<UserOutlined className={opacityIcon} />}
          />
        </Form.Item>
        <Form.Item name='password'>
          <Input
            type='password'
            placeholder='Пароль'
            prefix={<LockOutlined className={opacityIcon} />}
          />
        </Form.Item>
        <Form.Item name='repeatPassword'>
          <Input
            type='password'
            placeholder='Повторите пароль'
            prefix={<LockOutlined className={opacityIcon} />}
          />
        </Form.Item>
        <Form.Item noStyle={true}>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Зарегистрироваться
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
