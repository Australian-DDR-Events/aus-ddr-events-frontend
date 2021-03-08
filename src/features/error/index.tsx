import { Box, Heading, Link, Text } from '@chakra-ui/react';
import logo from 'assets/logo.png';
import React from 'react';

import { ErrorHeader, ErrorWrapper, LargeWidthImage } from './styled';

const Error = () => {
  return (
    <ErrorWrapper>
      <Box>
        <LargeWidthImage src={logo} alt="logo" />
        <ErrorHeader>404</ErrorHeader>
      </Box>
      <Heading level={2}>Page not Found</Heading>
      <Text>
        Go to <Link href="/">Home</Link> page.
      </Text>
    </ErrorWrapper>
  );
};

export default Error;
