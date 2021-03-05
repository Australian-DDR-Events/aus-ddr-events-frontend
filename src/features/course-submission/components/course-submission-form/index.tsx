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
import { DefaultSong } from 'context/songs/constants';

const CourseSubmissionForm = ({
  form,
  currentRecipe,
}: {
  form: FormInstance;
  currentRecipe: Recipe;
}) => {
  const [currentSong, setCurrentSong] = useState(DefaultSong);
  const [currentMaxScores, setCurrentMaxScores] = useState(new Array(currentRecipe.songs.length).fill(0));

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

  const updateCurrentSong = (index: number, songId: string) => {
    if (!songId) {
      setCurrentSong(DefaultSong);
      return;
    }
    currentRecipe.songs.every((song) => {
      if (song.dishSong.songId === songId) {
        setCurrentSong(song.songDetails);
        setCurrentMaxScores((prevMaxScores) => {
          prevMaxScores[index] = song.songDetails.maxScore;
          return prevMaxScores;
        })
        console.log(currentMaxScores);
        return false;
      }
      return true;
    });
  };

  return (
    <>
      {currentSong.difficulty &&
        (currentSong.difficulty === 'Expert' ? (
          <ExpertJacket src={`${process.env.ASSETS_URL}${currentSong.image256}`} />
        ) : (
          <ChallengeJacket src={`${process.env.ASSETS_URL}${currentSong.image256}`} />
        ))}
      {!currentSong.difficulty && (
        <Image
          src={`${process.env.ASSETS_URL}/songs/default/default.256.png`}
        />
      )}
      <Form form={form} layout="vertical" style={{ textAlign: 'left' }}>
        <Tabs
          defaultActiveKey="0"
          onChange={(activeKey) => {
            updateCurrentSong(Number(activeKey), form.getFieldValue(`songId${activeKey}`));
          }}
        >
          {Array.from(currentRecipe.songs.keys()).map((index) => {
            return (
              <Tabs.TabPane tab={`Step ${index + 1}`} key={index}>
                <Form.Item
                  name={`songId${index}`}
                  label={`Method ${index + 1}`}
                  dependencies={Array.from(currentRecipe.songs.keys()).map((songIndex) => {
                    return `songId${songIndex}`;
                  })}
                  rules={[
                    {
                      required: true,
                      message: 'Please select a method/song!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, songId) {
                        let duplicate = false;
                        Array.from(currentRecipe.songs.keys()).forEach((songIndex) => {
                          if (index != songIndex && songId === getFieldValue(`songId${songIndex}`)) {
                            duplicate = true;
                          }
                        });
                        if (duplicate) {
                          return Promise.reject(new Error('No duplicate methods/songs!'));
                        } else {
                          return Promise.resolve();
                        }
                      }
                    }),
                  ]}
                >
                  <Select
                    placeholder="Select a method/song"
                    onChange={(songId) => {
                      updateCurrentSong(index, songId.toString());
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
                  <InputNumber min={0} max={currentMaxScores[index]} />
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
