import React, { useContext } from 'react';
import { Form, Input, Tooltip, Button, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useLocation } from 'wouter';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from 'context/authentication';
import { DefaultUser, UserRepositoryContext } from 'context/dancer';
import { StyledForm } from './styled';

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 16 },
  },
};

const buttonLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const RegistrationForm = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const userRepo = useContext(UserRepositoryContext);
  const [form] = Form.useForm();
  const [, setLocation] = useLocation();

  const onFinish = (values: any) => {
    authRepo.authenticationRepositoryInstance
      .register(values.email, values.password)
      .then(() => {
        userRepo.userRepositoryInstance
          .update({
            ...DefaultUser,
            userName: values.displayName,
          })
          .then(() => {
            setLocation('/');
          });
      });
  };

  return (
    <StyledForm
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Typography.Title>Registration</Typography.Title>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },

          () => ({
            validator(_, value) {
              if (value.length >= 8) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Must have at least 8 characters!'),
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!'),
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="displayName"
        label={
          <span>
            Display Name&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your display name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...buttonLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default RegistrationForm;
