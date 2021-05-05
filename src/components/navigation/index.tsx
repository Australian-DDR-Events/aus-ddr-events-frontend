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
import { FiMenu } from '@react-icons/all-files/fi/FiMenu';
import { FiX } from '@react-icons/all-files/fi/FiX';
import logo from 'assets/logo.png';
import { AuthenticationRepositoryContext } from 'context/authentication';
import React, { useContext } from 'react';
import { getProfileImageUrl } from 'utils/assets';
import { useLocation } from 'wouter';

import ColorModeSwitch from './color-mode-switch';
import LoggedInMenuItems from './logged-in-menu-items';
import MenuItem from './menu-item';
import {
  GetNavigationDancerByIdQueryVariables,
  useGetNavigationDancerByIdQuery,
} from './operation.generated';
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

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [, setLocation] = useLocation();

  const authRepo = useContext(AuthenticationRepositoryContext);
  const loggedInUser = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();
  const toggle = () => setIsOpen(!isOpen);

  const queryVariables: GetNavigationDancerByIdQueryVariables = {
    dancerId: loggedInUser.id,
  };

  const [{ data, fetching }] = useGetNavigationDancerByIdQuery({
    variables: queryVariables,
    pause: !queryVariables.dancerId,
  });

  const onLogout = () => {
    authRepo.authenticationRepositoryInstance.logout().then((result) => {
      if (result.isOk()) {
        setLocation('/');
        window.location.reload();
      }
    });
  };

  const dancer = data?.dancerByAuthId;

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      color={['black', 'black', 'primary.700', 'primary.700']}
    >
      <Image
        src={logo}
        w="70px"
        onClick={() => setLocation('/')}
        cursor="pointer"
      />
      <Spacer />
      <ColorModeSwitch mr={2} display={{ lg: 'none' }} />

      {fetching && <SkeletonCircle display={{ lg: 'none' }} />}
      {dancer && !isOpen && (
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

      {dancer && isOpen && <MenuToggle toggle={toggle} isOpen={isOpen} />}
      {!dancer && !fetching && <MenuToggle toggle={toggle} isOpen={isOpen} />}
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
          {dancer && (
            <ProfileMenuItem
              isMobileView
              dancer={dancer}
              onProfileMenuItemClick={() => setLocation('/profile')}
            />
          )}
          <MenuItem onClick={() => setLocation('/leaderboard')}>
            Leaderboards
          </MenuItem>
          {dancer ? (
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
