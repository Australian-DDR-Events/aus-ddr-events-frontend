import React from 'react';
import {
  VStack,
  Center,
  StackItem,
  Heading,
  Box,
  Image,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

const Step3 = () => {
  return (
    <>
      <Center>
        <VStack w="80%" alignContent="center">
          <StackItem>
            <Heading size="lg">Let&apos;s get cooking!</Heading>
          </StackItem>
          <StackItem>
            <Text>
              As you acquire ingredients new dishes will become available to
              cook. Play the recipe songs in a single credit as a stamina course
              in order to produce a dish.
            </Text>
          </StackItem>
          <StackItem>
            <Center>
              <Box w="60%" minW="150px">
                <Image src="https://i.imgur.com/eoANmJd.png" align="center" />
              </Box>
            </Center>
          </StackItem>
          <StackItem>
            <Text>
              Ingredients, cooking order and efforts in cooking matter!
            </Text>
          </StackItem>
          <StackItem>
            <Heading size="md">
              The quality of the resulting dish relies on a number of factors:
            </Heading>
          </StackItem>
          <StackItem textAlign="left">
            <UnorderedList>
              <ListItem>
                Dish quality will be affected by your total EX score for the
                cooking process.
              </ListItem>
              <ListItem>
                Better quality ingredients will help make a better dish. Level
                up your ingredients as much as you can before cooking.
              </ListItem>
              <ListItem>
                The dish cooking order is also up to you! Experiment and choose
                the correct order of the cooking procedure for bonus cooking
                points.
              </ListItem>
            </UnorderedList>
          </StackItem>
          <StackItem>
            <Center>
              <Box w="60%" minW="150px">
                <Image src="https://i.imgur.com/I3DsXkT.png" align="center" />
              </Box>
            </Center>
          </StackItem>
        </VStack>
      </Center>
    </>
  );
};

export default Step3;
