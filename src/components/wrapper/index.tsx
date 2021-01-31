import React from 'react';
import { Layout } from 'antd';
import Navigation from '../navigation';
import { WhiteBackgroundLayout } from './styled';

const { Content } = Layout;

const Wrapper = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Navigation />
    <Layout>
      <Content>
        <WhiteBackgroundLayout>{children}</WhiteBackgroundLayout>
      </Content>
    </Layout>
  </Layout>
);

export default Wrapper;
