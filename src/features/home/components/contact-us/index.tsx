import React from 'react';
import { Space, Typography } from 'antd';
import { SmallWidthImage } from './styled';

const ContactUs = () => {
  const { Link } = Typography;
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
      <Space direction="horizontal">
        <Link href="https://www.facebook.com/groups/2053507828081261">
          <SmallWidthImage
            src="https://i.imgur.com/DG4HgJn.png"
            preview={false}
          />
        </Link>
        <Link href="https://discord.gg/DsKWPxY4V7" title="discord">
          <SmallWidthImage
            src="https://i.imgur.com/zGzeQ7G.png"
            preview={false}
          />
        </Link>
        <Link href="mailto:ausddrevents@gmail.com" title="gmail">
          <SmallWidthImage
            src="https://i.imgur.com/j1aQgYK.png"
            preview={false}
          />
        </Link>
      </Space>
      <Typography.Paragraph style={{ color: '#f2f2f2' }}>
        We’re looking forward to seeing your moves on the dance floor!
      </Typography.Paragraph>
    </>
  );
};

export default ContactUs;
