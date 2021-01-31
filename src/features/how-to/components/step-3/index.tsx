import React from 'react';
import { Typography, Space } from 'antd';
import { MediumWidthImage, List, ListItem } from './styled';

const Step3 = () => {
  const { Title } = Typography;
  return (
    <>
      <Space direction="vertical">
        <Space direction="vertical">
          <Title level={4}>Step 3: Let`s get cooking!</Title>
          <Typography.Paragraph>
            As you acquire ingredients new dishes will become available to cook.
            Play the recipe songs in a single credit as a stamina course in
            order to produce a dish.
          </Typography.Paragraph>
        </Space>
        <MediumWidthImage src="https://i.imgur.com/eoANmJd.png" />

        <Typography.Paragraph>
          Ingredients, cooking order and efforts in cooking matter!
        </Typography.Paragraph>
        <Typography.Paragraph style={{ textAlign: 'left' }}>
          The quality of the resulting dish relies on a number of factors:
        </Typography.Paragraph>
        <List>
          <ListItem>
            Dish quality will be affected by your total EX score for the cooking
            process.
          </ListItem>
          <ListItem>
            Better quality ingredients will help make a better dish. Level up
            your ingredients as much as you can before cooking.
          </ListItem>
          <ListItem>
            The dish cooking order is also up to you! Experiment and choose the
            correct order of the cooking procedure for bonus cooking points.
          </ListItem>
        </List>
        <MediumWidthImage src="https://i.imgur.com/I3DsXkT.png" />
      </Space>
    </>
  );
};

export default Step3;
