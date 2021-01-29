import React from 'react';
import { Space, Typography } from 'antd';
import { SmallWidthImage, MediumWidthImage } from './styled';

const HowTo = () => {
  return (
    <>
      <Typography.Title>How to Participate</Typography.Title>
      <Typography.Paragraph>
        To participate in AUSDDREvents seasonals, you must have access to DDRA
        or A20, have an e-Amusement pass, and live in Australia.
      </Typography.Paragraph>
      <MediumWidthImage src="https://i.imgur.com/bVWe0WE.png" alt="emusecard" />
      <Typography.Paragraph>
        Login to the website and play the songs within the season time-frame,
        take photos of your best scores, and upload them on the website in the
        scores section.
      </Typography.Paragraph>
      <MediumWidthImage
        src="https://i.imgur.com/6rTazTU.png"
        alt="scoressection"
      />
      <Typography.Paragraph>
        Playing songs and courses during the event period will earn you points
        that go towards badges that will be permanently displayed on your
        profile.
      </Typography.Paragraph>
      <Space>
        <SmallWidthImage src="https://i.imgur.com/C6eZJ0L.png" alt="badges" />
        <SmallWidthImage src="https://i.imgur.com/kmTnnyd.png" alt="badges" />
        <SmallWidthImage src="https://i.imgur.com/HUBlbyf.png" alt="badges" />
      </Space>
    </>
  );
};

export default HowTo;
