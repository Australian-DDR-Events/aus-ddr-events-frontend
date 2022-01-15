import {
  Icon,
  IconButton,
  IconButtonProps,
  useColorMode,
} from '@chakra-ui/react';
import { FaMoon } from '@react-icons/all-files/fa/FaMoon';
import { FaSun } from '@react-icons/all-files/fa/FaSun';
import React from 'react';

const ColorModeSwitch = (props?: Omit<IconButtonProps, 'aria-label'>) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={<Icon as={colorMode === 'light' ? FaMoon : FaSun} w={6} h={6} />}
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      variant="ghost"
      color={colorMode === 'light' ? 'blue.400' : 'yellow.300'}
      {...props}
    />
  );
};

export default ColorModeSwitch;
