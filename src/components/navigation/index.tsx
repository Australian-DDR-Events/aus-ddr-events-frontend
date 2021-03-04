import React, { useContext, useState } from 'react';
import { Layout, Menu, Image } from 'antd';
import { useLocation } from 'wouter';
import {
  UserOutlined,
  LoginOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  HomeOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { AuthenticationRepositoryContext } from 'context/authentication';
import logo from 'assets/logo.png';

const { Sider } = Layout;

const Navigation = ({ collapsible }: { collapsible: boolean }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [collapseWidth, setCollapseWidth] = useState(80);
  const [location, setLocation] = useLocation();
  const authRepo = useContext(AuthenticationRepositoryContext)
    .authenticationRepositoryInstance;
  const loggedInUser = authRepo.get().okOrDefault();
  const currentSelectKey = location.substring(1);

  const onLogout = () => {
    authRepo.logout().then((result) => {
      if (result.isOk()) {
        setLocation('/');
      }
    });
  };

  return (
    <Sider
      breakpoint="xs"
      collapsible={collapsible}
      collapsed={collapsible && collapsed}
      collapsedWidth={collapseWidth}
      onBreakpoint={(broken) => {
        if (broken) {
          setCollapseWidth(0);
        } else {
          setCollapseWidth(80);
        }
      }}
      onCollapse={() => {
        setCollapsed(!collapsed);
      }}
      theme="light"
      trigger={null}
    >
      <Image
        style={{ marginLeft: '16px', marginTop: '16px' }}
        width={24}
        src={logo}
        preview={false}
      />
      <Menu theme="light" defaultSelectedKeys={[currentSelectKey]}>
        <Menu.Item
          key="home"
          icon={<HomeOutlined />}
          onClick={() => {
            setLocation('/');
          }}
        >
          Home
        </Menu.Item>

        {loggedInUser.id && (
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

        <Menu.Item
          key="howTo"
          icon={<InfoCircleOutlined />}
          onClick={() => {
            setLocation('/how-to');
          }}
        >
          How to Participate
        </Menu.Item>

        {loggedInUser.id && (
          <Menu.Item
            key="submission"
            icon={<UploadOutlined />}
            onClick={() => {
              setLocation('/submission');
            }}
          >
            Submit Scores
          </Menu.Item>
        )}

        {loggedInUser.id && (
          <Menu.Item
            key="course-submission"
            icon={<UploadOutlined />}
            onClick={() => {
              setLocation('/course-submission');
            }}
          >
            Submit Courses
          </Menu.Item>
        )}

        {!loggedInUser.id ? (
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
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
            Logout
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default Navigation;
