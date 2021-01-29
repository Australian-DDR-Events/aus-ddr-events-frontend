import React from 'react';
import { Space, Typography, Image } from 'antd';

const HomeHowTo = () => {
  return (
    <>
      <Typography.Title>How to Participate</Typography.Title>
      <Typography.Paragraph>
        To participate in AUSDDREvents seasonals, you must have access to DDRA
        or A20, have an e-Amusement pass, and live in Australia.
      </Typography.Paragraph>
      <Image
        src="https://i.imgur.com/bVWe0WE.png"
        alt="emusecard"
        className="imagewidth"
      />
      <Typography.Paragraph>
        Login to the website and play the songs within the season time-frame,
        take photos of your best scores, and upload them on the website in the
        scores section.
      </Typography.Paragraph>
      <Image
        src="https://i.imgur.com/6rTazTU.png"
        alt="scoressection"
        className="imagewidth"
      />

      <Typography.Paragraph>
        Playing songs and courses during the event period will earn you points
        that go towards badges that will be permanently displayed on your
        profile.
      </Typography.Paragraph>
      <Space>
        <Image
          src="https://i.imgur.com/C6eZJ0L.png"
          alt="badges"
          className="smallimagewidth"
        />
        <Image
          src="https://i.imgur.com/kmTnnyd.png"
          alt="badges"
          className="smallimagewidth"
        />
        <Image
          src="https://i.imgur.com/HUBlbyf.png"
          alt="badges"
          className="smallimagewidth"
        />
      </Space>
    </>
  );
};

export default HomeHowTo;
