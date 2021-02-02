import React from 'react';
import { Space, Typography } from 'antd';
import logo from 'assets/logo.png';
import { ErrorWrapper, ErrorHeader, LargeWidthImage } from './styled';

const Error = () => {
  const { Title, Link } = Typography;

  return (
    <ErrorWrapper>
      <Space>
        <LargeWidthImage src={logo} alt="logo" />
        <ErrorHeader>404</ErrorHeader>
      </Space>
      <Title level={2}>Page not Found</Title>
      <Typography.Paragraph>
        Go to <Link href="/">Home</Link> page.
      </Typography.Paragraph>
    </ErrorWrapper>
  );
};

export default Error;