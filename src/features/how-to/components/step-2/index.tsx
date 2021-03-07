import {
  Box,
  Center,
  Heading,
  Image,
  StackItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const Step2 = () => {
  return (
    <>
      <Center>
        <VStack w="80%" alignContent="center">
          <StackItem>
            <Heading size="lg">Find ingredients</Heading>
          </StackItem>
          <StackItem>
            <Text>
              To start cooking you will need to find ingredients. Submit scores
              for the listed individual songs on the Score Submission Page to
              earn ingredients for cooking. Ingredient quality is based on the
              EX score of your score submission.
            </Text>
          </StackItem>
          <StackItem>
            <Center>
              <Box w="60%" minW="150px">
                <Image src="https://i.imgur.com/nNm2M8z.png" align="center" />
              </Box>
            </Center>
          </StackItem>
          <StackItem>
            <Text>
              Take photos of your best scores, and upload them on the website in
              the scores section.
            </Text>
          </StackItem>
          <StackItem>
            <Center>
              <Box w="60%" minW="150px">
                <Image src="https://i.imgur.com/6rTazTU.png" align="center" />
              </Box>
            </Center>
          </StackItem>
        </VStack>
      </Center>
    </>
  );
};

export default Step2;
