import React from 'react';
import { Typography, Button } from 'antd';
import {
  HomeWrapper,
  LargeWidthImage,
  DarkBackgroundSpace,
  WhiteBackgroundSpace,
} from './styled';
import HomeHowto from './components/how-to';
import HomeAboutUs from './components/about-us';
import HomeContactUs from './components/contact-us';

const Home = () => {
  const { Link } = Typography;

  return (
    <HomeWrapper>
      <WhiteBackgroundSpace direction="vertical">
        <Typography.Title>Coming Soon...</Typography.Title>
        <LargeWidthImage
          src="https://i.imgur.com/vgn9VFo.png"
          alt="Summer BBQ Logo"
        />
        <Typography.Title level={4}>
          Show off your moves and join in on the hottest DDR seasonal event
          starting February 2021. Pre-register your account today!
        </Typography.Title>
        <Link href="/register">
          <Button type="primary">Sign Up</Button>
        </Link>
      </WhiteBackgroundSpace>

      <DarkBackgroundSpace direction="vertical">
        <HomeAboutUs />
      </DarkBackgroundSpace>

      <WhiteBackgroundSpace direction="vertical">
        <HomeHowto />
      </WhiteBackgroundSpace>

      <DarkBackgroundSpace direction="vertical">
        <HomeContactUs />
        <Link href="/register">
          <Button type="primary">Sign Up</Button>
        </Link>
      </DarkBackgroundSpace>
    </HomeWrapper>
  );
};

export default Home;
