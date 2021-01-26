import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import useLocation from 'wouter/use-location';
import { AuthenticationRepositoryContext } from '../../services/authentication/authenticationRepositoryContext';
import { AuthenticationRepositoryContextInterface } from '../../services/authentication/types';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [, setLocation] = useLocation();

  useEffect(() => {
    const getAuthResult = authRepo.authenticationRepositoryInstance?.get();
    if (getAuthResult?.isOk() && getAuthResult.value) {
      setLocation('/');
    }
  }, []);

  const onFinish = (values: any) => {
    authRepo.authenticationRepositoryInstance
      ?.login(values.email, values.password)
      .then((result) => {
        if (result.isOk()) {
          setLocation('/');
        } else {
          alert('potato');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Form
      {...layout}
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

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
