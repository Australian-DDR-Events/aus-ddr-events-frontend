import React from 'react';
import { Space, Card, Typography, Image } from 'antd';

const Ingredients = () => {
  return (
    <>
      <Space>
        <Card title="Dish name">
          <Image width={160} src="#" alt="songjacket" />
          <Image width={160} src="#" alt="songjacket" />
          <Image width={160} src="#" alt="songjacket" />
          <Typography.Paragraph> song names </Typography.Paragraph>
          <Typography.Paragraph> Quality stars </Typography.Paragraph>
          <Typography.Paragraph> Ex score </Typography.Paragraph>
          <Typography.Paragraph> [Rank] </Typography.Paragraph>
        </Card>
      </Space>
    </>
  );
};
export default Ingredients;
