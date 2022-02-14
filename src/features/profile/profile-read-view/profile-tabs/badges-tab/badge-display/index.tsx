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
import { badgeIdToAsset } from 'utils/assets';

import { BadgeResponse } from '../types';

const BadgeDisplay = ({ badge }: { badge: BadgeResponse }) => (
  <>
    <Popover isLazy trigger="hover">
      <PopoverTrigger>
        <Box w="fit-content" textAlign="center">
          <Center>
            <Image src={badgeIdToAsset(badge.id, 128)} />
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
