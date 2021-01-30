import { Tabs } from 'antd';
import React from 'react';
import { User } from '../../../../context/user/types';

const CollectionContainer = ({
  user,
}: {
  user: User;
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Badges" key="1">

      </Tabs.TabPane>
      <Tabs.TabPane tab="To be added..." key="2">

      </Tabs.TabPane>
    </Tabs>
  )
}

export default CollectionContainer;