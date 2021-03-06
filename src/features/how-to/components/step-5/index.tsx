import React from 'react';
import {
  Box,
  Center,
  Heading,
  Image,
  StackItem,
  VStack,
  Text,
} from '@chakra-ui/react';

const Step5 = () => {
  return (
    <>
      <Center>
        <VStack w="80%" alignContent="center">
          <StackItem>
            <Heading size="lg">Try and try again!</Heading>
          </StackItem>
          <StackItem>
            <Text>
              There is no limit to how much you can cook! EX Scores will be
              presented on leaderboards with unique rewards being awarded to the
              top ranking players.
            </Text>
          </StackItem>
          <StackItem>
            <Text>
              Team cooking bonuses will be awarded when you cook with another
              player. Get involved with your local players and cook together for
              a small boost to your overall dish quality.
            </Text>
          </StackItem>
          <StackItem>
            <Center>
              <Box w="60%" minW="150px">
                <Image src="https://i.imgur.com/vgn9VFo.png" align="center" />
              </Box>
            </Center>
          </StackItem>
        </VStack>
      </Center>
    </>
  );
};

export default Step5;
