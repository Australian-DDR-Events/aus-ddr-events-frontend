import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { Dancer } from 'services/dancers';
import { useLocation } from 'wouter';

import ColorModeSwitch from '../color-mode-switch';
import ProfileMenuItem from '../profile-menu-item';

const LoggedInMenuItems = ({
  user,
  onLogoutClick,
}: {
  user: Dancer;
  onLogoutClick: () => void;
}) => {
  const [, setLocation] = useLocation();

  return (
    <>
      <HStack>
        <ColorModeSwitch
          mr={2}
          display={{ base: 'none', lg: 'inline-block' }}
        />
        <ProfileMenuItem
          isMobileView={false}
          user={user}
          onProfileMenuItemClick={() => setLocation('/profile')}
        />
        <Button
          size="md"
          rounded="md"
          colorScheme="gray"
          variant="outline"
          onClick={() => onLogoutClick()}
        >
          Log out
        </Button>
      </HStack>
    </>
  );
};

export default LoggedInMenuItems;
