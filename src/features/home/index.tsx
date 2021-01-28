import React, { useContext } from 'react';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from '../../context/authentication';
import { Space, Typography, Image, Button } from 'antd';
import { HomeWrapper } from './styled';
import HomeHowto from './home-howto';
import HomeAboutUs from './home-about';
import HomeContactUs from './home-contactus';


const Home = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );

  const loggedInUserId = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();

  return (
    <HomeWrapper>
      <Space className='whitebg' direction='vertical'>
        <Typography.Title>Coming Soon...</Typography.Title>
        <Image 
          src='https://i.imgur.com/vgn9VFo.png' 
          alt='Summer BBQ Logo' 
          className='imagewidth'
        />
        <Typography.Title level={4}>
          Show off your moves and join in on the hottest DDR seasonal event starting February 2021. Pre-register your account today!
        </Typography.Title>
        <Button type="primary">Sign Up</Button>
      </Space>

      <Space className='darkbg' direction='vertical'>
        <HomeAboutUs />
      </Space>
      <Space className='whitebg' direction='vertical'>
        <HomeHowto />
      </Space>
      <Space className='darkbg' direction='vertical'> 
        <HomeContactUs />
      </Space>
    </HomeWrapper>
       
        )
};

export default Home;
