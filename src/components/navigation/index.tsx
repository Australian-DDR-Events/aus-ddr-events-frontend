import React, { useContext, useState } from 'react';
import { Layout, Menu, Image } from 'antd';
import { useLocation } from 'wouter';
import { UserOutlined, LoginOutlined, HomeOutlined } from '@ant-design/icons';
import logo from 'assets/logo.png';
import { AuthenticationRepositoryContext } from 'context/authentication';

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
      <Menu theme="light" defaultSelectedKeys={[currentSelectKey]}>
        <Image
          style={{ marginLeft: '28px', marginTop: '16px' }}
          width={24}
          src={logo}
          preview={false}
        />

        <Menu.Item
          key="home"
          icon={<HomeOutlined />}
          onClick={() => {
            setLocation('/');
          }}
        >
          Home
        </Menu.Item>

        {loggedInUserId && (
          <Menu.Item
            key="profile"
            icon={<UserOutlined />}
            onClick={() => {
              setLocation('/profile');
            }}
          >
            Profile
          </Menu.Item>
        )}

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
