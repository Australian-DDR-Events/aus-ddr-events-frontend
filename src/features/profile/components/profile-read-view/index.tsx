import {
  Stack,
  Box,
  Center,
  Heading,
  Avatar,
  Button,
  Badge,
  Text,
  useMediaQuery,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { Dancer } from 'context/dancer';
import { defaultSpacing } from 'types/styled-components';
import { IoCheckmarkCircle } from 'react-icons/io5';
import ProfileTabs from '../profile-tabs';
import { StateOptions } from '../../constants';

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
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const getStateTextualRepresentation = (inputState: string): string => {
    return StateOptions.find((state) => state.key === inputState)?.value || '';
  };
  const getProfileImageUrl = () =>
    `${process.env.ASSETS_URL}${dancer.profilePicture}?${new Date()}`;
  const DEFAULT_PROFILE_PICTURE_URL = 'https://i.imgur.com/o0ulS6k.png';

  return (
    <Stack direction={['column', 'column', 'row']} spacing={defaultSpacing}>
      <Box w={isLargerThan800 ? `${defaultSpacing * 40}px` : '100%'}>
        <Center>
          <Avatar
            size="2xl"
            name={dancer.dancerName}
            src={getProfileImageUrl() || DEFAULT_PROFILE_PICTURE_URL}
            mb={defaultSpacing / 2}
            {...(getProfileImageUrl() && { bg: 'white' })}
          />
        </Center>
        {isEditable && (
          <Center>
            <Button
              w={isLargerThan800 ? '100%' : '50%'}
              onClick={onEditButtonClick}
              mb={defaultSpacing / 2}
            >
              Edit profile
            </Button>
          </Center>
        )}
        <Box textAlign={isLargerThan800 ? 'left' : 'center'}>
          <Heading>
            {dancer.dancerName}
            {emailVerified && !isLargerThan800 && (
              <Icon
                as={IoCheckmarkCircle}
                color="green"
                w={defaultSpacing * 0.75}
                h={defaultSpacing * 0.75}
              />
            )}
          </Heading>
          {emailVerified && isLargerThan800 && (
            <Badge
              fontSize="xs"
              colorScheme="green"
              borderRadius="full"
              mb={defaultSpacing / 4}
            >
              &nbsp;Verified&nbsp;
            </Badge>
          )}

          <Text fontSize="lg">
            {getStateTextualRepresentation(dancer.state)}
          </Text>
          <Text fontSize="lg">{dancer.primaryMachine}</Text>
        </Box>
      </Box>
      <ProfileTabs dancer={dancer} />
    </Stack>
  );
};

export default ProfileReadView;
