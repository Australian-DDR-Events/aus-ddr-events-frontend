import { Avatar, Button, Center } from '@chakra-ui/react';
import React from 'react';
import { Dancer } from 'services/dancers';
import { getProfileImageUrl } from 'utils/assets';

const ProfileMenuItem = ({
  isMobileView,
  onProfileMenuItemClick,
  user,
}: {
  isMobileView: boolean;
  onProfileMenuItemClick: () => void;
  user: Dancer;
}) => {
  return isMobileView ? (
    <Center mr={4}>
      <Avatar
        size="sm"
        name={user.name}
        src={
          user.profilePictureUrl
            ? getProfileImageUrl(user.profilePictureUrl)
            : undefined
        }
        display={{ lg: 'none' }}
        showBorder
        borderColor="blue.500"
        borderWidth={2}
        mr={2}
        onClick={onProfileMenuItemClick}
        {...(user.profilePictureUrl && {
          bgColor: 'transparent',
        })}
      />
      <Button
        colorScheme="blue"
        variant="link"
        onClick={onProfileMenuItemClick}
        display={{ lg: 'none' }}
        fontSize="xl"
      >
        My profile
      </Button>
    </Center>
  ) : (
    <>
      <Avatar
        size="md"
        name={user.name}
        src={user.profilePictureUrl ? user.profilePictureUrl : undefined}
        display={{ base: 'none', lg: 'inline-block' }}
        showBorder
        borderColor="blue.500"
        borderWidth={2}
        onClick={onProfileMenuItemClick}
        cursor="pointer"
        {...(user.profilePictureUrl && {
          bgColor: 'transparent',
        })}
      />
      <Button
        colorScheme="blue"
        variant="link"
        onClick={onProfileMenuItemClick}
        mr={2}
        display={{ base: 'none', lg: 'inline-block' }}
      >
        My profile
      </Button>
    </>
  );
};

export default ProfileMenuItem;
