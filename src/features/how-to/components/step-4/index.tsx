import React from 'react';
import { Typography, Space } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import { SmallWidthImage, MediumWidthImage } from './styled';

const Step4 = () => {
  const { Title } = Typography;
  return (
    <>
      <Space direction="vertical">
        <Space direction="vertical">
          <Title level={4}>Step 4: Earn rewards</Title>
          <Typography.Text>
            As dishes are produced, you will earn cooking stars which will
            contribute to your seasonal badge for the event duration. Badges
            will appear on your profile and unlock rewards that can be purchased
            once the season has concluded.
          </Typography.Text>
        </Space>
        <SmallWidthImage src="https://i.imgur.com/ChYOL3K.png" />
        <ArrowDownOutlined style={{ fontSize: '24px' }} />
        <SmallWidthImage src="https://i.imgur.com/oEce6Gv.png" />
        <ArrowDownOutlined style={{ fontSize: '24px' }} />
        <MediumWidthImage src="https://i.imgur.com/nGWCDfu.png" />
      </Space>
    </>
  );
};

export default Step4;
