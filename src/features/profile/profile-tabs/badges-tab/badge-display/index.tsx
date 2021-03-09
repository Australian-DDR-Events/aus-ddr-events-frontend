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
import { Badge } from 'context/badges/types';
import React from 'react';

const BadgeDisplay = ({
  badge,
  eventName,
}: {
  badge: Badge;
  eventName: string;
}) => (
  <>
    <Popover isLazy trigger="hover">
      <PopoverTrigger>
        <Box w="fit-content" textAlign="center">
          <Center>
            <Image src={`${process.env.ASSETS_URL}${badge.image128}`} />
          </Center>
          <Text fontWeight="bold">{eventName}</Text>
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
