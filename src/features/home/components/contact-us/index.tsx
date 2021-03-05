import React from 'react';
import { Center, Heading, Button, Text, useMediaQuery } from '@chakra-ui/react';
import { FaFacebook, FaDiscord, FaTwitter } from 'react-icons/fa';
import { defaultSpacing } from '~/types/styled-components';

const ContactUs = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [isLargerThan750] = useMediaQuery('(min-width: 750px)');
  return (
    <>
      <Heading as="h2" mb={defaultSpacing} textAlign="center">
        Want more information?
      </Heading>
      <Text fontSize="md">
        If you have any inquiries or are interested in getting involved with the
        AUSDDREvents team, feel free to get in touch with us via the following
        services:
      </Text>
      <Center mt={defaultSpacing} mb={defaultSpacing}>
        <Button
          colorScheme="facebook"
          leftIcon={<FaFacebook />}
          mr={isLargerThan750 ? defaultSpacing / 2 : defaultSpacing / 4}
          size={isLargerThan750 ? 'md' : 'sm'}
        >
          Facebook
        </Button>
        <Button
          colorScheme="twitter"
          leftIcon={<FaTwitter />}
          mr={isLargerThan750 ? defaultSpacing / 2 : defaultSpacing / 4}
          size={isLargerThan750 ? 'md' : 'sm'}
        >
          Twitter
        </Button>
        <Button
          bgColor="#7298DA"
          color="white"
          leftIcon={<FaDiscord />}
          size={isLargerThan750 ? 'md' : 'sm'}
        >
          Discord
        </Button>
      </Center>
      <Text fontSize="md">
        We’re looking forward to seeing your moves on the dance floor!
      </Text>
      {!isLoggedIn && (
        <Center>
          <Button>Sign up</Button>
        </Center>
      )}
    </>
  );
};

export default ContactUs;
