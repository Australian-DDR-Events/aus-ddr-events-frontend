import { Tabs } from 'antd';
import React from 'react';
import Ingredients from './scores/index';

const CollectionContainer = () => {
  return (
    <Tabs style={{ padding: '0px 8px' }} defaultActiveKey="1">
      <Tabs.TabPane tab="Badges" key="1" />
      <Tabs.TabPane tab="Scores" key="2">
        <Ingredients />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default CollectionContainer;
