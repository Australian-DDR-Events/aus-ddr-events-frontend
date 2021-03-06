import React from 'react';
import {
  Box,
  Text,
  Heading,
  Center,
  Image,
  VStack,
  StackItem,
} from '@chakra-ui/react';

const Step1 = () => {
  return (
    <>
      <Center>
        <VStack w="80%" alignContent="center">
          <StackItem>
            <Heading size="lg">
              Login or sign up to your AusDDREvents account
            </Heading>
          </StackItem>
          <StackItem>
            <Text>
              You will need to create an account or login to AUSDDREvents to
              begin your cook off for the season.
            </Text>
          </StackItem>
          <StackItem>
            <Center>
              <Box w="30%" minW="100px">
                <Center>
                  <Image src="https://i.imgur.com/m6CRQeh.png" />
                </Center>
              </Box>
              <Heading style={{ margin: '24px' }} level={5}>
                OR
              </Heading>
              <Box w="30%" minW="100px">
                <Center>
                  <Image src="https://i.imgur.com/IbgnoVC.png" />
                </Center>
              </Box>
            </Center>
          </StackItem>
        </VStack>
      </Center>
    </>
  );
};

export default Step1;
