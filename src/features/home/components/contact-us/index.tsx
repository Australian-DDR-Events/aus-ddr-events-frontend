import React from 'react';
import { Space, Typography } from 'antd';
import {
  faFacebook,
  faDiscord,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeButton } from './styled';

const ContactUs = () => {
  return (
    <>
      <Typography.Title style={{ color: '#f2f2f2' }}>
        Want more information?
      </Typography.Title>
      <Typography.Paragraph style={{ color: '#f2f2f2' }}>
        If you have any inquiries or are interested in getting involved with the
        AUSDDREvents team, feel free to get in touch with us via the following
        services:
      </Typography.Paragraph>
      <Space size="large" direction="horizontal">
        <FontAwesomeButton
          iconColor="#3b5998"
          target="_blank"
          href="https://www.facebook.com/groups/2053507828081261"
        >
          <FontAwesomeIcon icon={faFacebook} size="5x" />
        </FontAwesomeButton>
        <FontAwesomeButton
          iconColor="#7289da"
          target="_blank"
          href="https://discord.gg/DsKWPxY4V7"
        >
          <FontAwesomeIcon icon={faDiscord} size="5x" />
        </FontAwesomeButton>
        <FontAwesomeButton
          iconColor="#00aced"
          target="_blank"
          href="https://twitter.com/AusddrE"
        >
          <FontAwesomeIcon icon={faTwitter} size="5x" />
        </FontAwesomeButton>
        <FontAwesomeButton
          iconColor="white"
          target="_blank"
          href="mailto:ausddrevents@gmail.com"
        >
          <FontAwesomeIcon icon={faEnvelope} size="5x" />
        </FontAwesomeButton>
      </Space>
      <Typography.Paragraph style={{ color: '#f2f2f2' }}>
        We’re looking forward to seeing your moves on the dance floor!
      </Typography.Paragraph>
    </>
  );
};

export default ContactUs;
