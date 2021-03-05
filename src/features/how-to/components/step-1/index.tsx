import React from 'react';
import { Typography, Space } from 'antd';
import { MediumWidthImage } from './styled';

const Step1 = () => {
  const { Title } = Typography;
  return (
    <>
      <Space direction="vertical">
        <Title level={4}>
          Step 1: Login or sign up to your AusDDREvents account
        </Title>
        <Typography.Text>
          You will need to create an account or login to AUSDDREvents to begin
          your cook off for the season.
        </Typography.Text>
        <Space direction="horizontal">
          <MediumWidthImage
            src="https://i.imgur.com/m6CRQeh.png"
            preview={false}
          />
          <Title style={{ margin: '24px' }} level={5}>
            OR
          </Title>
          <MediumWidthImage
            src="https://i.imgur.com/IbgnoVC.png"
            preview={false}
          />
        </Space>
      </Space>
    </>
  );
};

export default Step1;
