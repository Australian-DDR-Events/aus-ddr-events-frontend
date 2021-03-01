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
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { DefaultSong } from 'context/songs/constants';
import { DetailedDishSong, Recipe } from '../../types';

const CourseSubmissionForm = ({
  form,
  currentRecipe,
  dishSongMap,
}: {
  form: FormInstance;
  currentRecipe: Recipe;
  dishSongMap: Map<string, DetailedDishSong>
}) => {
  const [isTeamCookingBonus, setIsTeamCookingBonus] = useState(false);
  const [currentJacket, setCurrentJacket] = useState('');

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
      return;
    }
    currentRecipe.songs.every((song) => {
      if (song.dishSong.songId === songId) {
        setCurrentJacket(song.songDetails.image256);
        return false;
      }
      return true;
    })
  }

  return (
    <>
      <Image
        src={currentJacket ? `${process.env.ASSETS_URL}${currentJacket}` : "https://i.imgur.com/fvFHxnY.png"}
      />
      <Form
        form={form}
        layout="vertical"
        style={{ textAlign: 'left' }}
      >
        <Tabs defaultActiveKey="0" onChange={(activeKey) => {
          updateCurrentSong(form.getFieldValue(`songId${activeKey}`));
        }}>
          {[0, 1, 2].map((index) => {
            return (
              <Tabs.TabPane tab={`Song ${index + 1}`} key={index}>
                <Form.Item
                  name={`songId${index}`}
                  label={`Song ${index + 1}`}
                  rules={[
                    {
                      required: true,
                      message: 'Please select a song!',
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a song"
                    onChange={(songId) => {updateCurrentSong(songId.toString())}}
                  >
                    {currentRecipe.songs.map((detailedDishSong) => {
                      return (
                        <Select.Option value={detailedDishSong.dishSong.songId}>
                          {detailedDishSong.songDetails.name}
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
          <Switch onChange={(checked) => setIsTeamCookingBonus(checked)} />
        </Form.Item>

        {/* {isTeamCookingBonus && ( */}
        <Form.Item
          label="End of Session Photograph"
          name="finalImage"
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
  );
};

export default CourseSubmissionForm;
