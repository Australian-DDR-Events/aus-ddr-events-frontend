import React from 'react';
import { Typography, Space } from 'antd';
import { SmallWidthImage, MediumWidthImage } from './styled';

const AboutUs = () => {
  return (
    <>
      <Typography.Title style={{ color: '#f2f2f2' }}>About Us</Typography.Title>
      <Typography.Paragraph style={{ color: '#f2f2f2' }}>
        AUSDDREvents is a DDR community based group that strives to provide both
        national level and local level events and competitions by DDR players,
        for DDR players. Inspired by other sites such as Valkyrie Dimension and
        LIFE4, our aim is to provide Australian players with seasonal challenges
        and month-long events that present players engaging content that also
        assists to develop their skills. These events also serve to promote the
        growth and health of DDR players within Australia.
      </Typography.Paragraph>
      <Space>
        <SmallWidthImage
          src="https://i.imgur.com/h3ETJKK.png"
          alt="ORA20 logo"
          preview={false}
        />
        <SmallWidthImage
          src="https://i.imgur.com/LrlkNLZ.png"
          alt="SCS logo"
          preview={false}
        />
      </Space>
      <Typography.Paragraph style={{ color: '#f2f2f2' }}>
        Furthermore, AUSDDREvents offers a national platform for DDR players to
        interact via Facebook and Discord, allowing people to reach out and
        share their passion for the game with other like-minded players. This
        group also aims to establish national level competition for the
        ambitious and talented with local tournaments through organisations such
        as Timezone and Crown.
      </Typography.Paragraph>
      <MediumWidthImage
        src="https://i.imgur.com/DeWq2Zz.jpg"
        alt="Group photo of CFA"
        preview={false}
      />
    </>
  );
};

export default AboutUs;
