import React from 'react';
import { Layout } from 'antd';
import Navigation from '../Navigation';
import { StyledContent, StyledHeader, WhiteBackgroundLayout } from './styles';

const { Footer } = Layout;

const Wrapper = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Navigation />
    <Layout>
      <WhiteBackgroundLayout>
        <StyledHeader />
      </WhiteBackgroundLayout>
      <StyledContent>
        <WhiteBackgroundLayout>{children}</WhiteBackgroundLayout>
      </StyledContent>
      <Footer style={{ textAlign: 'center' }}>Created by your truly</Footer>
    </Layout>
  </Layout>
);

export default Wrapper;
