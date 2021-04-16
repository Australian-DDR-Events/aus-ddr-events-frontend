import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  SkeletonCircle,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import logo from 'assets/logo.png';
import { AuthenticationRepositoryContext } from 'context/authentication';
import {
  Dancer,
  DancersRepositoryContext,
  DefaultDancer,
} from 'context/dancer';
import React, { useContext, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Result } from 'types/result';
import { getProfileImageUrl } from 'utils/assets';
import { useLocation } from 'wouter';

import ColorModeSwitch from './color-mode-switch';
import LoggedInMenuItems from './logged-in-menu-items';
import MenuItem from './menu-item';
import ProfileMenuItem from './profile-menu-item';

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

const Navigation = (props: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [, setLocation] = useLocation();

  const authRepo = useContext(AuthenticationRepositoryContext);
  const loggedInUser = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();
  const toggle = () => setIsOpen(!isOpen);
  const [dancer, setDancer] = React.useState(DefaultDancer);

  const onGetFinished = (u: Result<Error, Dancer>) => {
    setDancer(u.okOrDefault());
  };

  const dancersRepository = useContext(DancersRepositoryContext);

  useEffect(() => {
    if (loggedInUser.id)
      dancersRepository.dancersRepositoryInstance
        .getByAuthenticationId(loggedInUser.id)
        .then(onGetFinished);
  }, [loggedInUser]);

  const onLogout = () => {
    authRepo.authenticationRepositoryInstance.logout().then((result) => {
      if (result.isOk()) {
        setLocation('/');
        window.location.reload();
      }
    });
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      color={['black', 'black', 'primary.700', 'primary.700']}
      {...props}
    >
      <Image
        src={logo}
        w="70px"
        onClick={() => setLocation('/')}
        cursor="pointer"
      />
      <Spacer />
      <ColorModeSwitch mr={2} display={{ lg: 'none' }} />

      {loggedInUser.id && !dancer.id && (
        <SkeletonCircle display={{ lg: 'none' }} />
      )}
      {dancer.id && !isOpen && (
        <Avatar
          size="sm"
          name={dancer.ddrName}
          src={getProfileImageUrl(dancer.profilePictureUrl)}
          display={{ lg: 'none' }}
          showBorder
          borderColor="blue.500"
          borderWidth={2}
          onClick={toggle}
          {...(getProfileImageUrl(dancer.profilePictureUrl) && {
            bgColor: 'transparent',
          })}
        />
      )}

      {dancer.id && isOpen && <MenuToggle toggle={toggle} isOpen={isOpen} />}
      {!dancer.id && !loggedInUser.id && (
        <MenuToggle toggle={toggle} isOpen={isOpen} />
      )}
      <Box
        display={{ base: isOpen ? 'block' : 'none', lg: 'block' }}
        flexBasis={{ base: '100%', lg: 'auto' }}
      >
        <Stack
          spacing={6}
          align="center"
          justify={['center', 'center', 'flex-end', 'flex-end']}
          direction={['column', 'column', 'column', 'row']}
          pt={[4, 4, 0, 0]}
        >
          {loggedInUser.id && (
            <ProfileMenuItem
              isMobileView
              dancer={dancer}
              onProfileMenuItemClick={() => setLocation('/profile')}
            />
          )}
          <MenuItem onClick={() => setLocation('/leaderboard')}>
            Leaderboards
          </MenuItem>
          {loggedInUser.id ? (
            <LoggedInMenuItems dancer={dancer} onLogoutClick={onLogout} />
          ) : (
            <HStack>
              <ColorModeSwitch
                mr={2}
                display={{ base: 'none', lg: 'inline-block' }}
              />
              <Button
                size="md"
                rounded="md"
                variant="solid"
                colorScheme="blue"
                onClick={() => setLocation('/login')}
              >
                Login
              </Button>

              <Button
                size="md"
                rounded="md"
                variant="solid"
                colorScheme="pink"
                onClick={() => setLocation('/register')}
              >
                Register
              </Button>
            </HStack>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default Navigation;
