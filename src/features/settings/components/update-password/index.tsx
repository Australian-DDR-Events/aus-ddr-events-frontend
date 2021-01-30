import React, { useContext, useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import {
  AuthenticationRepositoryContextInterface,
  AuthenticationRepositoryContext,
} from 'context/authentication';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const UpdatePassword = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(true);

  const onFinish = (values: any) => {
    setSubmitEnabled(false);
    const { currentPassword, newPassword, confirmNewPassword } = values;
    if (newPassword !== confirmNewPassword) {
      setSubmitEnabled(true);
      return;
    }
    authRepo.authenticationRepositoryInstance
      .updatePassword(currentPassword, newPassword)
      .then((result) => {
        if (result.isOk()) {
          // woo success
          setSubmitEnabled(true);
        } else {
          // not woo failure
          setSubmitEnabled(true);
        }
      })
      .catch(() => {
        setSubmitEnabled(true);
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
        label="Current Password"
        name="currentPassword"
        rules={[
          { required: true, message: 'Please input your current password!' },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm New Password"
        name="confirmNewPassword"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password />
      </Form.Item>{' '}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={!submitEnabled}>
          {submitEnabled ? 'Submit' : <Spin />}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdatePassword;
