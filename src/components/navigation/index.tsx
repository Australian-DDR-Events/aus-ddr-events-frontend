import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import logo from 'assets/logo.png';
import { AuthenticationRepositoryContext } from 'context/authentication';
import React, { useContext } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLocation } from 'wouter';

import ColorModeSwitch from './color-mode-switch';

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

const MenuItem = ({
  children,
  onClick,
}: {
  children: React.ReactChild;
  onClick: any;
}) => {
  return (
    <Button
      variant="link"
      fontWeight="normal"
      colorScheme="blue"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const Navigation = (props: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [, setLocation] = useLocation();

  const authRepo = useContext(AuthenticationRepositoryContext)
    .authenticationRepositoryInstance;
  const loggedInUser = authRepo.get().okOrDefault();
  const toggle = () => setIsOpen(!isOpen);

  const onLogout = () => {
    authRepo.logout().then((result) => {
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
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <Box
        display={{ base: isOpen ? 'block' : 'none', lg: 'block' }}
        flexBasis={{ base: '100%', lg: 'auto' }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={['center', 'center', 'flex-end', 'flex-end']}
          direction={['column', 'column', 'column', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem onClick={() => setLocation('/how-to')}>
            How to participate
          </MenuItem>
          <MenuItem onClick={() => setLocation('/leaderboard')}>
            Leaderboards
          </MenuItem>
          {loggedInUser.id ? (
            <>
              <MenuItem onClick={() => setLocation('/submission')}>
                Submit scores
              </MenuItem>
              <MenuItem onClick={() => setLocation('/course-submission')}>
                Submit courses
              </MenuItem>
              <HStack>
                <ColorModeSwitch
                  mr={2}
                  display={{ base: 'none', lg: 'inline-block' }}
                />

                <Button
                  size="md"
                  rounded="md"
                  colorScheme="blue"
                  onClick={() => setLocation('/profile')}
                >
                  Profile
                </Button>
                <Button
                  size="md"
                  rounded="md"
                  colorScheme="gray"
                  variant="outline"
                  onClick={onLogout}
                >
                  Log out
                </Button>
              </HStack>
            </>
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
