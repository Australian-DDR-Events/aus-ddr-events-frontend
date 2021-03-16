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
import { IoArrowForward } from 'react-icons/io5';

const Step4 = () => {
  return (
    <>
      <Center marginBottom={16}>
        <VStack w="80%" alignContent="center">
          <StackItem>
            <Heading size="lg">Earn rewards</Heading>
          </StackItem>
          <StackItem>
            <Text>
              As dishes are produced, you will earn cooking stars which will
              contribute to your seasonal badge for the event duration. Badges
              will appear on your profile and unlock rewards that can be
              purchased once the season has concluded.
            </Text>
          </StackItem>
          <StackItem>
            <Center>
              <Box w="25%" h="25%" minW="75">
                <Center>
                  <Image src="https://i.imgur.com/ChYOL3K.png" align="center" />
                </Center>
              </Box>
              <IoArrowForward style={{ fontSize: '24px' }} />
              <Box w="25%" h="25%" minW="75">
                <Center>
                  <Image
                    src={`${process.env.ASSETS_URL}/badges/762491be-a6ae-4ace-8ba1-e681bdcb6137.256.png`}
                    align="center"
                  />
                </Center>
              </Box>
            </Center>
          </StackItem>
        </VStack>
      </Center>
    </>
  );
};

export default Step4;
