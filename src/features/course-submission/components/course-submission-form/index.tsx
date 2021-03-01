import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Image, InputNumber, Select, Switch, Tabs, Upload } from "antd";
import React, { useState } from "react";
import { DefaultDetailedDishSong } from "../../constants";
import { Recipe } from "../../types";

const CourseSubmissionForm = ({
  form,
  currentRecipe
}: {
  form: FormInstance;
  currentRecipe: Recipe;
}) => {
  const [isTeamCookingBonus, setIsTeamCookingBonus] = useState(false);
  const [currentDetailedDishSong, setCurrentDetailedDishSong] = useState(DefaultDetailedDishSong);

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
    <>
      <Image
        src={`${process.env.ASSETS_URL}${currentDetailedDishSong.songDetails.imageUrl}`}
        width={240}
      />
      <Form
        form={form}
        layout="vertical"
        style={{ textAlign: 'left', padding: '16px 0 0' }}
      >
        <Tabs
          defaultActiveKey="0"
          onChange={(activeKey) => {

          }}
        >
          {[0,1,2].map((index) => {
            return (
              <Tabs.TabPane
                tab={`Song ${index+1}`}
                key={index}
              >
                <Form.Item
                  name={`songId${index}`}
                  label={`Song ${index+1}`}
                  rules={[{
                    required: true,
                    message: "Please select a song!"
                  }]}
                >
                  <Select placeholder="Select a song">
                    {currentRecipe.songs.map((detailedDishSong) => {
                      return (
                        <Select.Option value={detailedDishSong.dishSong.songId}>{detailedDishSong.songDetails.name}</Select.Option>
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
              </Tabs.TabPane>
            );
          })}
        </Tabs>

        <Form.Item
          name="pairBonus"
          label="Team Cooking Bonus"
          valuePropName="checked"
        >
          <Switch
            onChange={(checked) => setIsTeamCookingBonus(checked)}
          />
        </Form.Item>

        {/* {isTeamCookingBonus && ( */}
          <Form.Item
            label={`End of Session Photograph`}
            name={`finalImage`}
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
        {/* )} */}

      </Form>
    </>
    
  )
}

export default CourseSubmissionForm;