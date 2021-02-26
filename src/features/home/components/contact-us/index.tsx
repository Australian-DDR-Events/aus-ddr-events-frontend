import React from 'react';
import { Center, Heading, HStack, Button, Text } from '@chakra-ui/react';
import { FaFacebook, FaDiscord, FaTwitter } from 'react-icons/fa';

const ContactUs = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <>
      <Center>
        <Heading as="h2" mb={8}>
          Want more information?
        </Heading>
      </Center>
      <Text fontSize="md">
        If you have any inquiries or are interested in getting involved with the
        AUSDDREvents team, feel free to get in touch with us via the following
        services:
      </Text>
      <Center mt={8} mb={8}>
        <HStack>
          <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
            Facebook
          </Button>
          <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
            Twitter
          </Button>
          <Button colorScheme="twitter" leftIcon={<FaDiscord />}>
            Twitter
          </Button>
        </HStack>
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
