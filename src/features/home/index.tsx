import React, { useContext } from 'react';
import { Typography, Button } from 'antd';
import { AuthenticationRepositoryContext } from 'context/authentication';
import {
  HomeWrapper,
  LargeWidthImage,
  DarkBackgroundSpace,
  LightBackgroundSpace,
} from './styled';
import HowTo from './components/how-to';
import AboutUs from './components/about-us';
import ContactUs from './components/contact-us';

const Home = () => {
  const { Link } = Typography;

  const authRepo = useContext(AuthenticationRepositoryContext)
    .authenticationRepositoryInstance;
  const loggedInUser = authRepo.get().okOrDefault();

  return (
    <HomeWrapper>
      <LightBackgroundSpace direction="vertical">
        <Typography.Title>Coming Soon...</Typography.Title>
        <LargeWidthImage
          src="https://i.imgur.com/vgn9VFo.png"
          alt="Summer BBQ Logo"
        />
        <Typography.Title level={4}>
          Show off your moves and join in on the hottest DDR seasonal event
          starting February 2021. Pre-register your account today!
        </Typography.Title>
        {!loggedInUser.id && (
          <Link href="/register">
            <Button type="primary">Sign Up</Button>
          </Link>
        )}
      </LightBackgroundSpace>

      <DarkBackgroundSpace direction="vertical">
        <AboutUs />
      </DarkBackgroundSpace>

      <LightBackgroundSpace direction="vertical">
        <HowTo />
      </LightBackgroundSpace>

      <DarkBackgroundSpace direction="vertical">
        <ContactUs />
        {!loggedInUser.id && (
          <Link href="/register">
            <Button type="primary">Sign Up</Button>
          </Link>
        )}
      </DarkBackgroundSpace>
    </HomeWrapper>
  );
};

export default Home;
