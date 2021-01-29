import React, { useState } from 'react';
import { Space, Typography, Image, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { HomeWrapper } from './styled';
import HomeHowto from './components/home-howto';
import HomeAboutUs from './components/home-about';
import HomeContactUs from './components/home-contactus';
import RegistrationForm from '../register';

const Home = () => {
  const [isSigningUp, setSigningUp] = useState(false);

  return !isSigningUp ? (
    <HomeWrapper>
      <Space className="whitebg" direction="vertical">
        <Typography.Title>Coming Soon...</Typography.Title>
        <Image
          src="https://i.imgur.com/vgn9VFo.png"
          alt="Summer BBQ Logo"
          className="imagewidth"
        />
        <Typography.Title level={4}>
          Show off your moves and join in on the hottest DDR seasonal event
          starting February 2021. Pre-register your account today!
        </Typography.Title>
        <Button
          type="primary"
          onClick={() => {
            setSigningUp(true);
          }}
        >
          Sign Up
        </Button>
      </Space>

      <Space className="darkbg" direction="vertical">
        <HomeAboutUs />
      </Space>
      <Space className="whitebg" direction="vertical">
        <HomeHowto />
      </Space>
      <Space className="darkbg" direction="vertical">
        <HomeContactUs />
        <Button
          type="primary"
          onClick={() => {
            setSigningUp(true);
          }}
        >
          Sign Up
        </Button>
      </Space>
    </HomeWrapper>
  ) : (
    <>
      <ArrowLeftOutlined
        onClick={() => {
          setSigningUp(false);
        }}
      />
      <RegistrationForm />
    </>
  );
};

export default Home;
