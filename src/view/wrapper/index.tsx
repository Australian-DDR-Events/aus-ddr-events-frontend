import React from 'react';
import { Layout } from 'antd';
import Navigation from '../navigation';
import { StyledContent, StyledHeader, WhiteBackgroundLayout } from './styled';

const { Footer } = Layout;

const Wrapper = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Navigation />
    <Layout>
      <StyledContent>
        <WhiteBackgroundLayout>{children}</WhiteBackgroundLayout>
      </StyledContent>
      <Footer style={{ textAlign: 'center' }}>Created by your truly</Footer>
    </Layout>
  </Layout>
);

export default Wrapper;
