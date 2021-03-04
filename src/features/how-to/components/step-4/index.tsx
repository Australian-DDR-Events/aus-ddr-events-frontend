import React from 'react';
import { Typography, Space } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import { SmallWidthImage } from './styled';

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
        <SmallWidthImage
          preview={false}
          src={`${
            process.env.ASSETS_URL
          }${`/summer2021/dishes/7dd83c2c-00dd-49b2-8059-f988b4303cd1.128.png`}`}
        />
        <ArrowDownOutlined style={{ fontSize: '24px' }} />
        <SmallWidthImage
          preview={false}
          src={`${
            process.env.ASSETS_URL
          }${`/badges/762491be-a6ae-4ace-8ba1-e681bdcb6137.128.png`}`}
        />
      </Space>
    </>
  );
};

export default Step4;
