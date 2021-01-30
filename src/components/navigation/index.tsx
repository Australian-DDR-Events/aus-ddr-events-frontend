import React, { useContext, useState } from 'react';
import { Layout, Menu, Image } from 'antd';
import { useLocation } from 'wouter';
import {
  UserOutlined,
  SmileOutlined,
  LoginOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { AuthenticationRepositoryContext } from 'context/authentication';
import logo from 'assets/logo.png';

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
        style={{ marginLeft: '24px' }}
        height={24}
        width={24}
        src={logo}
        preview={false}
      />

      <Menu
        theme="light"
        defaultSelectedKeys={[currentSelectKey]}
        mode="inline"
      >
        <Menu.Item
          key="home"
          icon={<HomeOutlined />}
          onClick={() => {
            setLocation('/');
          }}
        >
          Home
        </Menu.Item>
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
