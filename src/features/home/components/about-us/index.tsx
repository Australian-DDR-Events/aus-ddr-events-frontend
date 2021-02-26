import React from 'react';
import { Center, Heading, HStack, Image, Text } from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <>
      <Center>
        <Heading as="h2" mb={8}>
          About Us
        </Heading>
      </Center>
      <Text fontSize="md" mb={8}>
        AUSDDREvents is a DDR community based group that strives to provide both
        national level and local level events and competitions by DDR players,
        for DDR players. Inspired by other sites such as Valkyrie Dimension and
        LIFE4, our aim is to provide Australian players with seasonal challenges
        and month-long events that present players engaging content that also
        assists to develop their skills. These events also serve to promote the
        growth and health of DDR players within Australia.
      </Text>
      <Center mb={8}>
        <HStack>
          <Image
            src="https://i.imgur.com/h3ETJKK.png"
            alt="ORA20 logo"
            maxW="200px"
          />
          <Image
            src="https://i.imgur.com/LrlkNLZ.png"
            alt="SCS logo"
            maxW="200px"
          />
        </HStack>
      </Center>

      <Text fontSize="md" mb={8}>
        Furthermore, AUSDDREvents offers a national platform for DDR players to
        interact via Facebook and Discord, allowing people to reach out and
        share their passion for the game with other like-minded players. This
        group also aims to establish national level competition for the
        ambitious and talented with local tournaments through organisations such
        as Timezone and Crown.
      </Text>
      <Center>
        <Image
          src="https://i.imgur.com/DeWq2Zz.jpg"
          alt="Group photo of CFA"
          maxW="500px"
        />
      </Center>
    </>
  );
};

export default AboutUs;
