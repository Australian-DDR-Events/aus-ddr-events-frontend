import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link, useLocation } from 'wouter';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from 'context/authentication';
import { StyledForm, LoginFormForgot } from './styled';

const LoginForm = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [, setLocation] = useLocation();

  useEffect(() => {
    const loggedInUserId = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();
    if (loggedInUserId) {
      setLocation('/');
    }
  }, []);

  const onFinish = (values: any) => {
    authRepo.authenticationRepositoryInstance
      ?.login(values.email, values.password, values.remember)
      .then((result) => {
        if (result.isOk()) {
          setLocation('/');
        }
      });
  };

  return (
    <StyledForm
      layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Link href="/forgot-password">
          <LoginFormForgot>Forgot password?</LoginFormForgot>
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Log in
        </Button>
        Or{' '}
        <Link href="/register" className="active">
          register now!
        </Link>
      </Form.Item>
    </StyledForm>
  );
};

export default LoginForm;
