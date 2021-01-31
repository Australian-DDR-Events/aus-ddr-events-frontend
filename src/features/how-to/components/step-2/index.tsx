import React from 'react';
import { Typography, Space } from 'antd';
import { MediumWidthImage } from './styled';

const Step2 = () => {
  const { Title } = Typography;
  return (
    <>
      <Space direction="vertical">
        <Space direction="vertical">
          <Title level={4}>Step 2: Find ingredients</Title>
          <Typography.Paragraph>
            To start cooking you will need to find ingredients. Submit scores
            for individual songs via the Score Submission Page to earn
            ingredients for cooking. Ingredient quality is based on the EX score
            of your score submission.
          </Typography.Paragraph>
        </Space>
        <MediumWidthImage src="https://i.imgur.com/nNm2M8z.png" />
        <Typography.Paragraph>
          Take photos of your best scores, and upload them on the website in the
          scores section.
        </Typography.Paragraph>
        <MediumWidthImage src="https://i.imgur.com/6rTazTU.png" />
      </Space>
    </>
  );
};

export default Step2;
