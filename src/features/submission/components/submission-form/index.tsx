import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, InputNumber, Upload } from 'antd';
import React from 'react';

const SubmissionForm = ({ form }: { form: FormInstance }) => {
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
    <Form
      form={form}
      layout="vertical"
      style={{ textAlign: 'left', padding: '16px 0 0' }}
    >
      <Form.Item
        label="Score Photograph"
        name="photo"
        valuePropName="file"
        getValueFromEvent={normaliseFile}
        rules={[
          {
            required: true,
            message: 'Please upload a photograph of your score!',
          },
        ]}
      >
        <Upload {...uploadProps} listType="picture">
          <Button icon={<UploadOutlined />}>Upload photograph</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="EX Score"
        name="ex"
        rules={[
          {
            required: true,
            message: 'Please input a valid EX score!',
          },
        ]}
      >
        <InputNumber min={0} max={9999} />
      </Form.Item>
    </Form>
  );
};

export default SubmissionForm;
