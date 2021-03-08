import {
  Box,
  Center,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';

import { getAssetUrl } from '../../../utils/assets';

const HowTo = () => {
  const [isLargerThan750] = useMediaQuery('(min-width: 750px)');
  return (
    <Box>
      <Heading as="h2" mb={4}>
        How to Participate
      </Heading>
      <Text fontSize="md" mb={8}>
        To participate in AUSDDREvents seasonals, you must have access to DDRA
        or A20, have an e-Amusement pass, and live in Australia.
      </Text>
      <Center>
        <Image
          maxW={isLargerThan750 ? '50%' : '75%'}
          src="https://i.imgur.com/bVWe0WE.png"
          alt="emusecard"
          mb={8}
        />
      </Center>
      <Text fontSize="md" mb={8}>
        Login to the website and play the songs within the season time-frame,
        take photos of your best scores, and upload them on the website in the
        scores section.
      </Text>
      <Center>
        <Image
          maxW={isLargerThan750 ? '50%' : '75%'}
          src="https://i.imgur.com/6rTazTU.png"
          alt="scoressection"
          mb={8}
        />
      </Center>
      <Text fontSize="md" mb={8}>
        Playing songs and courses during the event period will earn you points
        that go towards badges that will be permanently displayed on your
        profile.
      </Text>
      <Center mb={8}>
        <Image
          maxW="25%"
          src={getAssetUrl(`/common/sample-badge-0.png`)}
          alt="badges"
        />
        <Image
          maxW="25%"
          src={getAssetUrl(`/common/sample-badge-1.png`)}
          alt="badges"
        />
        <Image
          maxW="25%"
          src={getAssetUrl(`/common/sample-badge-2.png`)}
          alt="badges"
        />
      </Center>
    </Box>
  );
};

export default HowTo;
