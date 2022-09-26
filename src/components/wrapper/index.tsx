import Footer from 'components/footer';
import Navigation from 'components/navigation';
import React from 'react';


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
