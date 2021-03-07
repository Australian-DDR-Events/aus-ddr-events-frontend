import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { Dancer } from 'context/dancer';
import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { defaultSpacing } from 'types/styled-components';

import { StateOptions } from '../constants';
import ProfileTabs from '../profile-tabs';

const ProfileReadView = ({
  isEditable,
  emailVerified,
  dancer,
  onEditButtonClick,
}: {
  isEditable: boolean;
  emailVerified: boolean;
  dancer: Dancer;
  onEditButtonClick: () => void;
}) => {
  const [isLargerThan769] = useMediaQuery('(min-width: 769px)');
  const getStateTextualRepresentation = (inputState: string): string => {
    return StateOptions.find((state) => state.key === inputState)?.value || '';
  };
  const getProfileImageUrl = () =>
    `${process.env.ASSETS_URL}${
      dancer.profilePictureUrl
    }?${new Date().toISOString()}`;
  const DEFAULT_PROFILE_PICTURE_URL = 'https://i.imgur.com/o0ulS6k.png';

  return (
    <Stack
      direction={['column', 'column', 'column', 'row']}
      spacing={defaultSpacing}
    >
      <Box w={isLargerThan769 ? `${defaultSpacing * 40}px` : '100%'}>
        <Center>
          <Avatar
            size="2xl"
            name={dancer.ddrName}
            src={getProfileImageUrl() || DEFAULT_PROFILE_PICTURE_URL}
            mb={defaultSpacing / 2}
            {...(getProfileImageUrl() && { bg: 'white' })}
          />
        </Center>
        {isEditable && (
          <Center>
            <Button
              w={isLargerThan769 ? '100%' : '50%'}
              onClick={onEditButtonClick}
              mb={defaultSpacing / 2}
            >
              Edit profile
            </Button>
          </Center>
        )}
        <Box textAlign={isLargerThan769 ? 'left' : 'center'}>
          <Heading>
            {dancer.ddrName}
            {emailVerified && !isLargerThan769 && (
              <Icon
                as={IoCheckmarkCircle}
                color="green"
                w={defaultSpacing * 0.75}
                h={defaultSpacing * 0.75}
              />
            )}
          </Heading>
          {emailVerified && isLargerThan769 && (
            <Badge
              fontSize="xs"
              colorScheme="green"
              borderRadius="full"
              mb={defaultSpacing / 4}
            >
              &nbsp;Verified&nbsp;
            </Badge>
          )}

          <Text fontSize="sm" mb={-1} color="gray">
            Dancer code
          </Text>
          <Text fontSize="lg" mb={defaultSpacing / 8}>
            {dancer.ddrCode}
          </Text>

          <Text fontSize="sm" mb={-1} color="gray">
            State
          </Text>
          <Text fontSize="lg" mb={defaultSpacing / 8}>
            {getStateTextualRepresentation(dancer.state)}
          </Text>

          <Text fontSize="sm" mb={-1} color="gray">
            Primary machine
          </Text>
          <Text fontSize="lg">{dancer.primaryMachine}</Text>
        </Box>
      </Box>
      <ProfileTabs dancer={dancer} />
    </Stack>
  );
};

export default ProfileReadView;
