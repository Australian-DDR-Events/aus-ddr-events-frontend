import React from 'react';
import { Typography, Space } from 'antd';
import { MediumWidthImage } from './styled';

const Step5 = () => {
  const { Title } = Typography;
  return (
    <>
      <Space direction="vertical">
        <Space direction="vertical">
          <Title level={4}>Step 5: Try and try again!</Title>
          <Typography.Paragraph>
            There is no limit to how much you can cook! EX Scores will be
            presented on leaderboards with unique rewards being awarded to the
            top ranking players.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Team cooking bonuses will be awarded when you cook with another
            player. Get involved with your local players and cook together for a
            small boost to your overall dish quality.
          </Typography.Paragraph>
        </Space>
        <MediumWidthImage
          src="https://i.imgur.com/vgn9VFo.png"
          preview={false}
        />
      </Space>
    </>
  );
};

export default Step5;
