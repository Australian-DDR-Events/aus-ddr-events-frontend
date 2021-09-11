import { Avatar, Button, Center } from '@chakra-ui/react';
import { useAuthentication } from 'hooks/use-authentication';
import React from 'react';

const ProfileMenuItem = ({
  isMobileView,
  onProfileMenuItemClick,
}: {
  isMobileView: boolean;
  onProfileMenuItemClick: () => void;
}) => {
  const { getClaim } = useAuthentication();

  const nickname = getClaim<string>('nickname');
  const profilePicture = getClaim<string>('picture');

  return isMobileView ? (
    <Center mr={4}>
      <Avatar
        size="sm"
        name={nickname.okOrDefault()}
        src={profilePicture.isOk() ? profilePicture.value : undefined}
        display={{ lg: 'none' }}
        showBorder
        borderColor="blue.500"
        borderWidth={2}
        mr={2}
        onClick={onProfileMenuItemClick}
        {...(profilePicture.okOrDefault() && {
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
        name={nickname.okOrDefault()}
        src={profilePicture.isOk() ? profilePicture.value : undefined}
        display={{ base: 'none', lg: 'inline-block' }}
        showBorder
        borderColor="blue.500"
        borderWidth={2}
        onClick={onProfileMenuItemClick}
        cursor="pointer"
        {...(profilePicture.okOrDefault() && {
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
