import { Button, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { UserRepositoryContext } from '../../../../context/user';
import { StateOptions } from './constants';
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
    // console.log(values);
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

  const uploadProps = {
    beforeUpload: (file: File) => {
      return false;
    },
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e[0].file;
    }
    return e.file;
  }

  return (
    <FormWrapper>
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
            getValueFromEvent={normFile}>
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Upload picture</Button>
            </Upload>
          </Form.Item>
        </Form.Item>
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
          <Button type="default" htmlType="button" onClick={() => onCancelSubmit()}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
};

export default ProfileForm;
