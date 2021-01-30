import React, { useContext, useState } from 'react';
import { Layout, Menu, Image } from 'antd';
import { useLocation } from 'wouter';
import {
  UserOutlined,
  SmileOutlined,
  LoginOutlined,
  LogoutOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { AuthenticationRepositoryContext } from '../../context/authentication';
// eslint-disable-next-line import/no-internal-modules
import logo from '../../assets/logo.png';

const { Sider } = Layout;

const Navigation = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [collapseWidth, setCollapseWidth] = useState(80);
  const [location, setLocation] = useLocation();
  const [siderWidth, setSiderWidth] = useState(200);
  const authRepo = useContext(AuthenticationRepositoryContext)
    .authenticationRepositoryInstance;
  const loggedInUserId = authRepo.get()
    .okOrDefault();
  const currentSelectKey = location.substring(1);

  const onLogout = () => {
    authRepo.logout()
      .then((result) => {
        if (result.isOk()) {
          setLocation('/');
          window.location.reload();
        }
      })
  }

  return (
    <Sider
      breakpoint="xs"
      collapsible
      collapsed={collapsed}
      collapsedWidth={collapseWidth}
      onBreakpoint={(broken) => {
        if (broken) {
          setCollapseWidth(0);
          setSiderWidth(120);
        } else {
          setCollapseWidth(80);
          setSiderWidth(200);
        }
      }}
      onCollapse={() => {
        setCollapsed(!collapsed);
      }}
      theme="light"
      width={siderWidth}
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
        {!loggedInUserId ? (
          <Menu.Item
            key="10"
            icon={<LoginOutlined />}
            onClick={() => {
              setLocation('/login');
            }}
          >
            Login
          </Menu.Item>
        ) : (
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={onLogout}
          >
            Logout
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default Navigation;
