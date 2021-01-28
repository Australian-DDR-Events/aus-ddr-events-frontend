import React from 'react';
import { Typography, Image, Space } from 'antd';

const HomeAboutUs = () => {
    return (
        <>
            <Typography.Title style={{color: '#f2f2f2'}}>About Us</Typography.Title>
            <Typography.Paragraph style={{color: '#f2f2f2'}}>
                AUSDDREvents is a DDR community based group that strives to provide both national level and local level events and competitions by DDR players, for DDR players.
                Inspired by other sites such as Valkyrie Dimension and LIFE4, our aim is to provide Australian players with seasonal challenges and month-long events that present players engaging content that also assists to develop their skills.
                These events also serve to promote the growth and health of DDR players within Australia.
            </Typography.Paragraph>
            <Space>
              <Image 
                src='https://i.imgur.com/h3ETJKK.png' 
                alt='Summer BBQ Logo' 
                className='smallimagewidth'
              />
              <Image 
                src='https://i.imgur.com/LrlkNLZ.png' 
                alt='Summer BBQ Logo' 
                className='smallimagewidth'
              />
            </Space>
            <Typography.Paragraph style={{color: '#f2f2f2'}}>
                Furthermore, AUSDDREvents offers a national platform for DDR players to interact via Facebook and Discord, allowing people to reach out and share their passion for the game with other like-minded players.  
                This group also aims to establish national level competition for the ambitious and talented with local tournaments through organisations such as Timezone and Crown. 
            </Typography.Paragraph>
            <Image 
              src='https://i.imgur.com/DeWq2Zz.jpg' 
              alt='Group photo of CFA'
              className='imagewidth'
            />
        </>
    )
}

export default HomeAboutUs;