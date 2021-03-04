import React, { useState } from 'react';
import { Affix, Button, Drawer, Layout } from 'antd';
import Navigation from '../navigation';
import { ResponsiveButton, WhiteBackgroundLayout } from './styled';
import { MenuUnfoldOutlined } from '@ant-design/icons';

const { Content } = Layout;

const Wrapper = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation collapsible={true} />
      <Layout>
        <Drawer
          placement='left'
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <Navigation collapsible={false} />
        </Drawer>
        <Content>
          <WhiteBackgroundLayout>
            <Affix offsetTop={16}>
              <ResponsiveButton>
                <Button
                  onClick={() => setVisible(true)}
                  type="text"
                >
                  <MenuUnfoldOutlined />
                </Button>
              </ResponsiveButton>
            </Affix>
            {children}
          </WhiteBackgroundLayout>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Wrapper;
