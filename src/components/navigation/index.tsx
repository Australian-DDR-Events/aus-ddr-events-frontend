import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Button,
  Stack,
  Image,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { useLocation } from 'wouter';
import logo from 'assets/logo.png';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';

const MenuToggle = ({ toggle, isOpen }: { toggle: any; isOpen: boolean }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      <Icon as={isOpen ? IoChevronUp : IoChevronDown} w={6} h={6} />
    </Box>
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
      }
    });
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
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
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={['center', 'center', 'flex-end', 'flex-end']}
          direction={['column', 'column', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem onClick={() => setLocation('/how-to')}>
            How to participate
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
            <Button
              size="md"
              rounded="md"
              variant="solid"
              colorScheme="blue"
              onClick={() => setLocation('/login')}
            >
              Login
            </Button>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default Navigation;
