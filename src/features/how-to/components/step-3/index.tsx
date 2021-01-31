import React from 'react';
import { Typography, Space, Image } from 'antd';

const Step3 = () => {
  const { Title } = Typography;
  return (
    <>
      <Space direction="vertical">
        <Space direction="vertical">
          <Title level={4}>Step 3: Let`s get cooking!</Title>
          <Typography.Text>
            As you acquire ingredients new dishes will become available to cook.
            Play the recipe songs in a single credit as a stamina course in
            order to produce a dish.
          </Typography.Text>
        </Space>
        <Image src="https://i.imgur.com/gMKNJyS.png" />
      </Space>
    </>
  );
};

export default Step3;
