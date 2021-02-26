import React from 'react';
import { Box, Heading, Text, Image, HStack, Center } from '@chakra-ui/react';

const HowTo = () => {
  return (
    <Box align="center" justifyItems="center">
      <Heading as="h2" mb={8}>
        How to Participate
      </Heading>
      <Text fontSize="md" mb={8}>
        To participate in AUSDDREvents seasonals, you must have access to DDRA
        or A20, have an e-Amusement pass, and live in Australia.
      </Text>
      <Image
        maxW="500px"
        src="https://i.imgur.com/bVWe0WE.png"
        alt="emusecard"
      />
      <Text fontSize="md" mb={8}>
        Login to the website and play the songs within the season time-frame,
        take photos of your best scores, and upload them on the website in the
        scores section.
      </Text>
      <Image
        maxW="500px"
        src="https://i.imgur.com/6rTazTU.png"
        alt="scoressection"
        mb={8}
      />
      <Text fontSize="md" mb={8}>
        Playing songs and courses during the event period will earn you points
        that go towards badges that will be permanently displayed on your
        profile.
      </Text>
      <Center>
        <HStack>
          <Image
            maxW="200px"
            src="https://i.imgur.com/C6eZJ0L.png"
            alt="badges"
          />
          <Image
            maxW="200px"
            src="https://i.imgur.com/kmTnnyd.png"
            alt="badges"
          />
          <Image
            maxW="200px"
            src="https://i.imgur.com/HUBlbyf.png"
            alt="badges"
          />
        </HStack>
      </Center>
    </Box>
  );
};

export default HowTo;
