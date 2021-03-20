import {
  Button,
  Center,
  Heading,
  StackItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'wouter';

const Step1 = () => {
  const [, setLocation] = useLocation();
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
            <Center mb={16}>
              <Button
                size="md"
                rounded="md"
                variant="solid"
                colorScheme="blue"
                onClick={() => setLocation('/login')}
              >
                Login
              </Button>

              <Heading style={{ margin: '24px' }} level={5}>
                OR
              </Heading>

              <Button
                size="md"
                rounded="md"
                variant="solid"
                colorScheme="pink"
                onClick={() => setLocation('/register')}
              >
                Register
              </Button>
            </Center>
          </StackItem>
        </VStack>
      </Center>
    </>
  );
};

export default Step1;
