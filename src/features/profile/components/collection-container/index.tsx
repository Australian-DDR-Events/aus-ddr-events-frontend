import { Tabs } from 'antd';
import React from 'react';
import Ingredients from './scores/ingredients';
import { Dancer } from 'context/dancer';
import Badges from './badges';

const CollectionContainer = ({ dancer }: { dancer: Dancer }) => {
  return (
    <Tabs style={{ padding: '0px 8px' }} defaultActiveKey="1">
      <Tabs.TabPane tab="Badges" key="1">
        <Badges dancer={dancer} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Scores" key="2">
        <Ingredients dancer={dancer} />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default CollectionContainer;
