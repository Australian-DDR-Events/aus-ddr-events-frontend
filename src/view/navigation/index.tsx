import React, { useContext, useState } from 'react';
import { Layout, Menu, Image } from 'antd';
import { useLocation } from 'wouter';
import { AuthenticationRepositoryContext } from '../../providers/authentication';
import { UserOutlined, SmileOutlined, LoginOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Navigation = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [location, setLocation] = useLocation();
  const loggedInUserId = useContext(AuthenticationRepositoryContext)
    .authenticationRepositoryInstance.get()
    .okOrDefault();
  const currentSelectKey = location.substring(1);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => {
        setCollapsed(!collapsed);
      }}
      theme="light"
    >
      <Image
        height={32}
        width="auto"
        src="http://placekitten.com/32/14"
        preview={false}
      />

      <Menu
        theme="light"
        defaultSelectedKeys={[currentSelectKey]}
        mode="inline"
      >
        <Menu.Item key="about" icon={<SmileOutlined />}>
          About
        </Menu.Item>
        <Menu.Item
          key="profile"
          icon={<UserOutlined />}
          onClick={() => {
            setLocation('/profile');
          }}
        >
          Profile
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
