import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, FormInstance, InputNumber, Row, Select, Switch, Upload } from "antd";
import React, { useState } from "react";

const CourseSubmissionForm = ({ form }: { form: FormInstance }) => {
  const songs = [
    "Beautiful Dream ESP",
    "Algorithm ESP",
    "Daily Lunch Special ESP",
  ]

  const [isTeamCookingBonus, setIsTeamCookingBonus] = useState(false);

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
      <Row
        gutter={[
          { xs: 0, xl: 24 },
          { xs: 0, xl: 24 },
        ]}
      >
        {songs.map((song, index) => {
          return (
            <Col xs={24} xl={8} className="gutter-row">
              <Form.Item
                name={`song${index}`}
                label={`Song ${index+1}`}
                rules={[{
                  required: true,
                  message: "Please select a song!"
                }]}
              >
                <Select placeholder="Select a song">
                  {songs.map((title) => {
                    return (
                      <Select.Option value={title}>{title}</Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label={`Score Photograph ${index+1}`}
                name={`scoreImage${index}`}
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
                label={`EX Score ${index+1}`}
                name={`score${index}`}
                rules={[
                  {
                    required: true,
                    message: 'Please input a valid EX score!',
                  },
                ]}
              >
                <InputNumber min={0} max={9999} />
              </Form.Item>
            </Col>
          );
        })}
        
        <Col xs={0} xl={8} className="gutter-row" />

        <Col xs={24} xl={8} className="gutter-row">
          <Form.Item
            name="team"
            label="Team Cooking Bonus"
            valuePropName="checked"
          >
            <Switch
              onChange={(checked) => setIsTeamCookingBonus(checked)}
            />
          </Form.Item>

          {isTeamCookingBonus && (
            <Form.Item
              label={`End of Session Photograph`}
              name={`sessionImage`}
              valuePropName="file"
              getValueFromEvent={normaliseFile}
              rules={[
                {
                  required: isTeamCookingBonus,
                  message: 'Please upload a photograph of your session!',
                },
              ]}
            >
              <Upload {...uploadProps} listType="picture">
                <Button icon={<UploadOutlined />}>Upload photograph</Button>
              </Upload>
            </Form.Item>
          )}
        </Col>

      </Row>

    </Form>
  )
}

export default CourseSubmissionForm;