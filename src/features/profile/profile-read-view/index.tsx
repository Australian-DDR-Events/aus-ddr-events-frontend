import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useClipboard,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { defaultPixel } from 'types/styled';
import { StateOptions } from 'utils/dropdown-options';

import { DancerResponse } from '../types';
import EditableAvatar from './editable-avatar';
import ProfileTabs from './profile-tabs';

const ProfileReadView = ({
  isEditable,
  dancer,
  onEditButtonClick,
}: {
  isEditable: boolean;
  dancer: DancerResponse;
  onEditButtonClick: () => void;
}) => {
  const [isLargerThan769] = useMediaQuery('(min-width: 769px)');
  const getStateTextualRepresentation = (inputState: string): string => {
    return StateOptions.find((state) => state.key === inputState)?.value || '';
  };

  const { onCopy } = useClipboard(
    `${window.location.origin}/profile/${dancer.id}`,
  );

  const toast = useToast();
  const onShareButtonClick = () => {
    onCopy();
    toast({
      description: 'Copied profile link ✨',
      status: 'success',
      duration: 1500,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Stack direction={['column', 'column', 'column', 'row']} spacing={8}>
      <Box w={isLargerThan769 ? `${defaultPixel * 40}px` : '100%'}>
        <Center>
          <EditableAvatar dancerId={dancer.id} isEditable />
        </Center>
        {isEditable && (
          <Center>
            <Button
              w={isLargerThan769 ? '100%' : '50%'}
              onClick={onEditButtonClick}
            >
              Edit profile
            </Button>
          </Center>
        )}

        <Center>
          <Button
            colorScheme="blue"
            w={isLargerThan769 ? '100%' : '50%'}
            onClick={onShareButtonClick}
            mb={4}
            mt={isEditable ? 2 : 0}
          >
            Share profile
          </Button>
        </Center>

        <Box textAlign={isLargerThan769 ? 'left' : 'center'}>
          <Heading>{dancer.name}</Heading>

          {dancer.code && (
            <>
              <Text fontSize="sm" mb={-1} color="gray">
                Dancer code
              </Text>
              <Text fontSize="lg" mb={defaultPixel / 8}>
                {dancer.code}
              </Text>
            </>
          )}

          {dancer.state && (
            <>
              <Text fontSize="sm" mb={-1} color="gray">
                State
              </Text>
              <Text fontSize="lg" mb={defaultPixel / 8}>
                {getStateTextualRepresentation(dancer.state)}
              </Text>
            </>
          )}

          {dancer.primaryLocation && (
            <>
              <Text fontSize="sm" mb={-1} color="gray">
                Primary machine
              </Text>
              <Text fontSize="lg">{dancer.primaryLocation}</Text>
            </>
          )}
        </Box>
      </Box>
      <ProfileTabs id={dancer.id} />
    </Stack>
  );
};

export default ProfileReadView;
