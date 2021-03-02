import React from 'react';
import { Tabs } from 'antd';
import Ingredients from './ingredients';
import Dishes from './dishes';

const { TabPane } = Tabs;

const Scores = () => {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Ingredients" key="1">
          <Ingredients />
        </TabPane>
        <TabPane tab="Dishes" key="2">
          <Dishes />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Scores;
