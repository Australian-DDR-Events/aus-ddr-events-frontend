import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  FormInstance,
  Image,
  InputNumber,
  Select,
  Switch,
  Tabs,
  Typography,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { Recipe } from '../../types';
import { ChallengeJacket, ExpertJacket } from '../../styled';

const CourseSubmissionForm = ({
  form,
  currentRecipe,
}: {
  form: FormInstance;
  currentRecipe: Recipe;
}) => {
  const [currentJacket, setCurrentJacket] = useState('');
  const [currentDifficulty, setCurrentDifficulty] = useState('');

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

  const updateCurrentSong = (songId: string) => {
    if (!songId) {
      setCurrentJacket('');
      setCurrentDifficulty('');
      return;
    }
    currentRecipe.songs.every((song) => {
      if (song.dishSong.songId === songId) {
        setCurrentJacket(song.songDetails.image256);
        setCurrentDifficulty(song.songDetails.difficulty);
        return false;
      }
      return true;
    });
  };

  return (
    <>
      {currentDifficulty &&
        (currentDifficulty === 'Expert' ? (
          <ExpertJacket src={`${process.env.ASSETS_URL}${currentJacket}`} />
        ) : (
          <ChallengeJacket src={`${process.env.ASSETS_URL}${currentJacket}`} />
        ))}
      {!currentDifficulty && (
        <Image
          src={`${process.env.ASSETS_URL}/songs/default/default.256.png`}
        />
      )}
      <Form form={form} layout="vertical" style={{ textAlign: 'left' }}>
        <Tabs
          defaultActiveKey="0"
          onChange={(activeKey) => {
            updateCurrentSong(form.getFieldValue(`songId${activeKey}`));
          }}
        >
          {Array.from(currentRecipe.songs.keys()).map((index) => {
            return (
              <Tabs.TabPane tab={`Step ${index + 1}`} key={index}>
                <Form.Item
                  name={`songId${index}`}
                  label={`Method ${index + 1}`}
                  rules={[
                    {
                      required: true,
                      message: 'Please select a method/song!',
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a method/song"
                    onChange={(songId) => {
                      updateCurrentSong(songId.toString());
                    }}
                  >
                    {currentRecipe.songs.map((detailedDishSong) => {
                      return (
                        <Select.Option value={detailedDishSong.dishSong.songId}>
                          <Typography.Text strong>
                            {detailedDishSong.dishSong.cookingMethod}
                          </Typography.Text>
                          {` - ${detailedDishSong.songDetails.name} [${detailedDishSong.songDetails.difficulty}]`}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label={`Score Photograph ${index + 1}`}
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
                  label={`EX Score ${index + 1}`}
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
          <Switch />
        </Form.Item>

        <Form.Item
          label="End of Session Photograph"
          name="finalImage"
          valuePropName="file"
          getValueFromEvent={normaliseFile}
          rules={[
            {
              required: true,
              message: 'Please upload a photograph of your session!',
            },
          ]}
        >
          <Upload {...uploadProps} listType="picture">
            <Button icon={<UploadOutlined />}>Upload photograph</Button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};

export default CourseSubmissionForm;
