import { Button, Form, Input, Typography } from 'antd';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from 'context/authentication';
import React, { useContext } from 'react';

import { StyledForm } from './styled';

const EmailForm = ({ onSubmit }: { onSubmit: Function }) => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );

  const onFinish = (values: any) => {
    authRepo.authenticationRepositoryInstance
      .sendPasswordResetEmail(values.email)
      .then((result) => {
        if (result.isOk()) onSubmit();
      });
  };

  return (
    <StyledForm
      layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Typography.Title>Reset password</Typography.Title>
      <Typography.Paragraph type="secondary">
        Enter the email associated with your account and we&apos;ll send an
        email with instructions to reset your password.
      </Typography.Paragraph>
      <Form.Item
        label="Email address"
        name="email"
        rules={[
          { required: true, message: 'Please input your username!' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Continue
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default EmailForm;
