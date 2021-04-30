import { Box, Center, Container, Heading, Icon, Text } from '@chakra-ui/react';
import { IoMailUnreadOutline } from '@react-icons/all-files/io5/IoMailUnreadOutline';
import React from 'react';

const EmailSent = () => (
  <Container maxW="container.xl" centerContent p={8}>
    <Center w="100%">
      <Icon color="blue.500" as={IoMailUnreadOutline} w="40%" h="40%" />
    </Center>
    <Box alignItems="center">
      <Heading size="lg">Check your email</Heading>
    </Box>
    <Box alignItems="center">
      <Text>We&apos;ve sent a password reset link to your email.</Text>
    </Box>
  </Container>
);

export default EmailSent;
