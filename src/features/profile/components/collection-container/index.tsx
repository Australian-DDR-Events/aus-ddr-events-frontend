import { Tabs } from 'antd';
import React from 'react';
import Badges from './badges';

const CollectionContainer = () => {
  return (
    <Tabs style={{ padding: '0px 8px' }} defaultActiveKey="1">
      <Tabs.TabPane tab="Badges" key="1">
        <Badges />
      </Tabs.TabPane>
      <Tabs.TabPane tab="To be added..." key="2" />
    </Tabs>
  );
};

export default CollectionContainer;
