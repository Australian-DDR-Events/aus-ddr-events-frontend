import React, { useContext, useState } from 'react';
import { Layout, Menu } from 'antd';
import { PieChartOutlined, LoginOutlined } from '@ant-design/icons';
import { useLocation } from 'wouter';
import { AuthenticationRepositoryContext } from '../../providers/authentication';

const { Sider } = Layout;

const Navigation = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [, setLocation] = useLocation();
  const loggedInUserId = useContext(AuthenticationRepositoryContext)
    .authenticationRepositoryInstance.get()
    .okOrDefault();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => {
        setCollapsed(!collapsed);
      }}
    >
      <div className="logo" />
      <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          About
        </Menu.Item>
        {!loggedInUserId && (
          <Menu.Item
            key="10"
            icon={<LoginOutlined />}
            onClick={() => {
              setLocation('/login');
            }}
          >
            Login
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default Navigation;
