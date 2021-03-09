import { Button, Center, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { FaDiscord, FaFacebook, FaTwitter } from 'react-icons/fa';
import { defaultPixel } from 'types/styled';

const ContactUs = () => {
  const [isLargerThan750] = useMediaQuery('(min-width: 750px)');
  const openLinkInNewTab = (url: string) => {
    const win = window?.open(url, '_blank');
    win?.focus();
  };
  return (
    <>
      <Heading as="h2" mb={defaultPixel} textAlign="center">
        Want more information?
      </Heading>
      <Text fontSize="md">
        If you have any inquiries or are interested in getting involved with the
        AUSDDREvents team, feel free to get in touch with us via the following
        services:
      </Text>
      <Center mt={defaultPixel} mb={defaultPixel}>
        <Button
          colorScheme="facebook"
          leftIcon={<FaFacebook />}
          mr={isLargerThan750 ? 4 : 2}
          size={isLargerThan750 ? 'md' : 'sm'}
          onClick={() =>
            openLinkInNewTab('https://www.facebook.com/groups/2053507828081261')
          }
        >
          Facebook
        </Button>
        <Button
          colorScheme="twitter"
          leftIcon={<FaTwitter />}
          mr={isLargerThan750 ? 4 : 2}
          size={isLargerThan750 ? 'md' : 'sm'}
          onClick={() => openLinkInNewTab('https://twitter.com/AusddrE')}
        >
          Twitter
        </Button>
        <Button
          bgColor="#7298DA"
          color="white"
          leftIcon={<FaDiscord />}
          size={isLargerThan750 ? 'md' : 'sm'}
          onClick={() => openLinkInNewTab('https://discord.gg/DsKWPxY4V7')}
        >
          Discord
        </Button>
      </Center>
      <Text fontSize="md" textAlign="center">
        We’re looking forward to seeing your moves on the dance floor!
      </Text>
    </>
  );
};

export default ContactUs;
