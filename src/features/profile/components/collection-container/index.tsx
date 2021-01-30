import { Tabs } from 'antd';
import React from 'react';

const CollectionContainer = () => {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Badges" key="1" />
      <Tabs.TabPane tab="To be added..." key="2" />
    </Tabs>
  );
};

export default CollectionContainer;
