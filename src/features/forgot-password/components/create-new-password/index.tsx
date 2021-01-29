import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useLocation } from 'wouter';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from '../../../../context/authentication';
import { StyledForm } from './styled';

/* This component is currently not being used as 
Firebase has its own password reset form */
const CreateNewPassword = () => {
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
      <Typography.Title>Create new password</Typography.Title>
      <Typography.Paragraph type="secondary">
        Your new password must be different from previously used passwords.
      </Typography.Paragraph>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Continue
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default CreateNewPassword;