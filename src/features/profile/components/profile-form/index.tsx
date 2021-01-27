import { Button, Form, Input, Select } from 'antd';
import React, { useContext } from 'react';
import { UserRepositoryContext } from '../../../../context/user';
import { StateOptions } from './constants';
import { ProfileFormData } from './types';

const ProfileForm = ({
  formData,
  onSuccessfulSubmit,
}: {
  formData: ProfileFormData;
  onSuccessfulSubmit: Function;
}) => {
  const userRepo = useContext(UserRepositoryContext);
  const onFinish = (values: ProfileFormData) => {
    userRepo.userRepositoryInstance
      .update({
        ...formData,
        ...values,
      })
      .then(() =>
        onSuccessfulSubmit({
          ...formData,
          ...values,
        }),
      );
  };
  return (
    <Form
      layout="vertical"
      initialValues={formData}
      onFinish={onFinish}
      style={{ textAlign: 'left' }}
    >
      <Form.Item label="Username">
        <Form.Item name="displayName" noStyle>
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item label="Dancer name">
        <Form.Item name="dancerName" noStyle>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="State" name="state" extra="Which state do you live in?">
        <Select>
          {StateOptions.map((option, index) => (
            // todo: add key to option object
            // eslint-disable-next-line react/no-array-index-key
            <Select.Option key={index + 1} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Primary machine"
        name="primaryMachine"
        extra="Where do you mainly play DDR at?"
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="default">Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
