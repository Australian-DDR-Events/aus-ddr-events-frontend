import {
  HStack,
  Icon,
  IconButton,
  Image,
  SkeletonCircle,
  Spacer,
} from '@chakra-ui/react';
import { FiMenu } from '@react-icons/all-files/fi/FiMenu';
import { FiX } from '@react-icons/all-files/fi/FiX';
import logo from 'assets/logo.png';
import { DefaultDancer } from 'context/dancer';
import { useAuthentication } from 'hooks/use-authentication';
import React from 'react';
import { useLocation } from 'wouter';

import LoggedInMenuItems from './logged-in-menu-items';
import MenuItem from './menu-item';
import ProfileMenuItem from './profile-menu-item';
import {
  LoginButton,
  MobileTabletColorModeSwitch,
  NavBarContainer,
  NavBarMenuItemsContainer,
  NavBarProfilePictureIcon,
  PCColorModeSwitch,
  RegisterButton,
} from './styled';

const MenuToggle = ({ toggle, isOpen }: { toggle: any; isOpen: boolean }) => {
  return (
    <IconButton
      aria-label="Menu toggle"
      icon={<Icon as={isOpen ? FiX : FiMenu} w={6} h={6} />}
      onClick={toggle}
      display={{ lg: 'none' }}
      color="gray.500"
      variant="ghost"
    />
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [, setLocation] = useLocation();

  const { login, logout, isAuthenticated, isPending, getClaim } =
    useAuthentication();

  const toggle = () => setIsOpen(!isOpen);

  const onLogout = () => {
    logout();
  };

  const nickname = getClaim<string>('nickname');
  const picture = getClaim<string>('picture');

  return (
    <NavBarContainer>
      <Image
        src={logo}
        w="70px"
        onClick={() => setLocation('/')}
        cursor="pointer"
      />
      <Spacer />
      <MobileTabletColorModeSwitch />

      {isPending() && <SkeletonCircle display={{ lg: 'none' }} />}

      {isAuthenticated() && !isOpen && (
        <NavBarProfilePictureIcon
          name={nickname.okOrDefault()}
          src={picture.isOk() ? picture.value : undefined}
          onClick={toggle}
          {...(picture.okOrDefault() && {
            bgColor: 'transparent',
          })}
        />
      )}

      {isAuthenticated() && isOpen && (
        <MenuToggle toggle={toggle} isOpen={isOpen} />
      )}

      {!isAuthenticated() && <MenuToggle toggle={toggle} isOpen={isOpen} />}

      <NavBarMenuItemsContainer isOpen={isOpen}>
        {isAuthenticated() && (
          <ProfileMenuItem
            isMobileView
            // dancer={DefaultDancer}
            onProfileMenuItemClick={() => setLocation('/profile')}
          />
        )}
        <MenuItem onClick={() => setLocation('/leaderboard')}>
          Leaderboards
        </MenuItem>
        {isAuthenticated() ? (
          <LoggedInMenuItems dancer={DefaultDancer} onLogoutClick={onLogout} />
        ) : (
          <HStack>
            <PCColorModeSwitch />
            <LoginButton onClick={() => login()}>Login</LoginButton>

            <RegisterButton onClick={() => setLocation('/register')}>
              Register
            </RegisterButton>
          </HStack>
        )}
      </NavBarMenuItemsContainer>
    </NavBarContainer>
  );
};

export default Navigation;
