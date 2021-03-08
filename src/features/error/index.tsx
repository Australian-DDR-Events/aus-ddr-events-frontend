import { Box, Container, Heading, Image, Link, Text } from '@chakra-ui/react';
import logo from 'assets/logo.png';
import React from 'react';

const Error = () => {
  return (
    <Container>
      <Box>
        <Image src={logo} alt="logo" />
        <Heading>404</Heading>
      </Box>
      <Heading level={2}>Page not Found</Heading>
      <Text>
        Go to <Link href="/">Home</Link> page.
      </Text>
    </Container>
  );
};

export default Error;
