import React, { useContext } from 'react';
import { Form, Input, Tooltip, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useLocation } from 'wouter';
import { DefaultUser, UserRepositoryContext } from '~/context/user';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from '~/context/authentication';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const RegistrationForm = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const userRepo = useContext(UserRepositoryContext);
  const [form] = Form.useForm();
  const [, setLocation] = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  }; // todo: remove the eslint disable and properly implement this

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
