import React from 'react';
import { Typography, Space, Image } from 'antd';

const Step2 = () => {
  const { Title } = Typography;
  return (
    <>
      <Space direction="vertical">
        <Space direction="vertical">
          <Title level={4}>Step 2: Find ingredients</Title>
          <Typography.Text>
            To start cooking you will need to find ingredients. Submit scores
            for individual songs via the Score Submission Page to earn
            ingredients for cooking. Ingredient quality is based on the EX score
            of your score submission.
          </Typography.Text>
        </Space>
        <Image src="https://i.imgur.com/nNm2M8z.png" />
      </Space>
    </>
  );
};

export default Step2;
