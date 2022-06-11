import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { css } from '@linaria/core';
import { Button, Form, Input, Card, Space, Typography } from 'antd';
import Text from 'antd/es/typography/Text';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAuthForm } from 'auth-frontend/common/api';

/**
 * Форма регистрации.
 */
export const RegisterForm: FC = () => {
  const [form, onFinish] = useAuthForm('registerBasic');

  return (
    <Card title='Регистрация'>
      <Form form={form} onFinish={onFinish}>
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
