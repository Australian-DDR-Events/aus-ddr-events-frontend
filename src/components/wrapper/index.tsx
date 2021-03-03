import React, { useState } from 'react';
import { Drawer, Layout } from 'antd';
import Navigation from '../navigation';
import { WhiteBackgroundLayout } from './styled';

const { Content } = Layout;

const Wrapper = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation
        collapsible={true}
      />
      <Layout>
        <Drawer
          placement='left'
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <Navigation
            collapsible={false}
          />
        </Drawer>
        <Content>
          <WhiteBackgroundLayout>{children}</WhiteBackgroundLayout>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Wrapper;
