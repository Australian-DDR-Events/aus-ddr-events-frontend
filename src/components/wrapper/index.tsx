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
  </>
);

export default Wrapper;
