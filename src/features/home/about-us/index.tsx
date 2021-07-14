import {
  Box,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const AboutUs = () => {
  return (
    <>
      <Box maxW="75%" margin="0 auto">
        <Box textAlign="center" paddingBottom="3rem">
          <Heading size="lg" paddingBottom="1rem">
            AUSDDREvents is a DDR community based group.
          </Heading>
          <Text fontSize="md" mb={8}>
            National level and local level events and competitions by DDR
            players, for DDR players.
          </Text>
        </Box>
        <SimpleGrid minChildWidth="244px" columns={2} padding="1rem">
          <Center padding="0 1rem">
            <Image src="https://imgur.com/PU0Aq2q.png" alt="event logos" />
          </Center>
          <Box margin="auto">
            <Heading size="md" paddingBottom="0.5em">
              Competition
            </Heading>
            <Text fontSize="md" mb={8}>
              Inspired by other sites such as Valkyrie Dimension and LIFE4, our
              aim is to provide Australian players with seasonal challenges and
              month-long events that present players engaging content that also
              assists to develop their skills.
            </Text>
            <Heading size="md" paddingBottom="0.5em">
              Health
            </Heading>
            <Text fontSize="md" mb={8}>
              These events also serve to promote the growth and health of DDR
              players within Australia.
            </Text>
          </Box>
        </SimpleGrid>

        <SimpleGrid padding="1rem" minChildWidth="244px" columns={2}>
          <Box margin="auto">
            <Heading size="md" paddingBottom="0.5em">
              Social
            </Heading>
            <Text fontSize="md" mb={8}>
              Furthermore, AUSDDREvents offers a national platform for DDR
              players to interact via Facebook and Discord, allowing people to
              reach out and share their passion for the game with other
              like-minded players.
            </Text>
            <Heading size="md" paddingBottom="0.5em">
              Local Tournaments
            </Heading>
            <Text fontSize="md" mb={8}>
              This group also aims to establish national level competition for
              the ambitious and talented with local tournaments through
              organisations such as Timezone and Crown.
            </Text>
          </Box>
          <Center padding="0 1rem">
            <Image
              src="https://i.imgur.com/DeWq2Zz.jpg"
              alt="Group photo of CFA"
              padding="1rem"
            />
          </Center>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default AboutUs;
