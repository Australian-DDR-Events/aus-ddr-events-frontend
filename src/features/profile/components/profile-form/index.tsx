import { Button, Form, Input, Select, Upload, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { UserRepositoryContext } from 'context/user';
import { StateOptions } from 'features/profile/constants';
import { ProfileFormData } from './types';
import { FormWrapper } from './styled';

const ProfileForm = ({
  formData,
  onSuccessfulSubmit,
  onCancelSubmit,
}: {
  formData: ProfileFormData;
  onSuccessfulSubmit: Function;
  onCancelSubmit: Function;
}) => {
  const userRepo = useContext(UserRepositoryContext);

  const onFinish = (values: ProfileFormData) => {
    userRepo.userRepositoryInstance
      .update({
        ...formData,
        ...values,
      })
      .then(() => onSuccessfulSubmit());
  };

  const uploadProps = {
    beforeUpload: () => {
      return false;
    },
  };

  const normaliseFile = (e: any) => {
    if (Array.isArray(e)) {
      return e[0].file;
    }
    return e.file;
  };

  return (
    <FormWrapper>
      <Typography.Title>Edit Profile</Typography.Title>
      <Form
        layout="vertical"
        initialValues={formData}
        onFinish={onFinish}
        style={{ textAlign: 'left' }}
      >
        <Form.Item label="Profile Picture">
          <Form.Item
            name="newProfilePicture"
            valuePropName="file"
            getValueFromEvent={normaliseFile}
          >
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Upload picture</Button>
            </Upload>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Username">
          <Form.Item name="userName" noStyle>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Dancer name">
          <Form.Item name="dancerName" noStyle>
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          extra="Which state do you live in?"
        >
          <Select>
            {StateOptions.map((option) => (
              // todo: add key to option object
              // eslint-disable-next-line react/no-array-index-key
              <Select.Option key={option.key} value={option.key}>
                {option.value}
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
          <Button
            style={{ marginRight: '8px' }}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={() => onCancelSubmit()}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
};

export default ProfileForm;
