import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  MenuButton,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FiMenu } from '@react-icons/all-files/fi/FiMenu';
import { FiX } from '@react-icons/all-files/fi/FiX';
import React, { ReactElement } from 'react';

import ColorModeSwitch from '../color-mode-switch';

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

export const MenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: any;
  isOpen: boolean;
}) => {
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

export const PCColorModeSwitch = () => <ColorModeSwitch mr={2} />;

export const HeaderButton = ({
  content,
  action,
}: {
  content: string;
  action: () => void;
}) => {
  return <Button onClick={action}>{content}</Button>;
};

const DropdownContent = styled(MenuList, { target: 'content-test' })`
  position: relative;
  display: none;
`;

const DropdownButton = styled(MenuButton)`
  color: #888;
  &:hover {
    color: ${(props) => (props.dark ? '#ccc' : '#333')};
  }

  &:hover + ${DropdownContent} {
    display: block;
  }
  ${() => `
    &:hover + ${DropdownContent} {
      display: block;
    }
  `}
`;
export { DropdownButton, DropdownContent };
