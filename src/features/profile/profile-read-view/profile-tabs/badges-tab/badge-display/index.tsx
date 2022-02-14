import {
  Box,
  Center,
  Image,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import { BadgeResponse } from '../types';

const BadgeDisplay = ({ badge }: { badge: BadgeResponse }) => (
  <>
    <Popover isLazy trigger="hover">
      <PopoverTrigger>
        <Box w="fit-content" textAlign="center">
          <Center>
            <Image src={`${process.env.ASSETS_URL}${badge.id}`} />
          </Center>
          <Text fontWeight="bold">{badge.eventName}</Text>
          <Text>{badge.name}</Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverBody>
          <Text p={4}>{badge.description}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  </>
);

export default BadgeDisplay;
