import {
  Avatar,
  AvatarProps,
  Box,
  Button,
  ButtonProps,
  Flex,
  Stack,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';

import ColorModeSwitch from './color-mode-switch';

export const NavBarContainer = ({
  children,
}: {
  children: (false | ReactElement)[];
}) => (
  <Flex
    align="center"
    justify="space-between"
    wrap="wrap"
    w="100%"
    p={8}
    bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
    color={['black', 'black', 'primary.700', 'primary.700']}
  >
    {children}
  </Flex>
);

export const NavBarProfilePictureIcon = (props: AvatarProps) => (
  <Avatar
    size="sm"
    display={{ lg: 'none' }}
    showBorder
    borderColor="blue.500"
    borderWidth={2}
    {...props}
  />
);

export const NavBarMenuItemsContainer = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: (false | ReactElement)[];
}) => (
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
      {children}
    </Stack>
  </Box>
);

export const LoginButton = (props: ButtonProps) => (
  <Button size="md" rounded="md" variant="solid" colorScheme="blue" {...props}>
    {props.children}
  </Button>
);

export const RegisterButton = (props: ButtonProps) => (
  <Button size="md" rounded="md" variant="solid" colorScheme="pink" {...props}>
    {props.children}
  </Button>
);

export const PCColorModeSwitch = () => (
  <ColorModeSwitch mr={2} display={{ base: 'none', lg: 'inline-block' }} />
);

export const MobileTabletColorModeSwitch = () => (
  <ColorModeSwitch mr={2} display={{ lg: 'none' }} />
);

export const Test = {};
