import React from 'react';
import { Divider, Typography } from 'antd';
import Ingredients from './components/ingredients';
import Dishes from './components/dishes';
import { SongsWrapper } from './styled';

const Scores = () => {
  return (
    <>
      <SongsWrapper>
        <Typography.Title> Ingredients </Typography.Title>
        <Ingredients />
        <Divider />
        <Typography.Title> Dishes </Typography.Title>
        <Dishes />
      </SongsWrapper>
    </>
  );
};

export default Scores;
