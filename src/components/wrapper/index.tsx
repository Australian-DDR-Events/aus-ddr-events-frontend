import Footer from 'components/footer';
import React from 'react';

import Navigation from '../navigation';

const Wrapper = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => (
  <>
    <Navigation />
    {children}
    <Footer />
  </>
);

export default Wrapper;
