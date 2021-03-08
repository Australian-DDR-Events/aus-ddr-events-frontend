import { Icon, IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={<Icon as={colorMode === 'light' ? FaMoon : FaSun} w={6} h={6} />}
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      variant="ghost"
      color={colorMode === 'light' ? 'blue.400' : 'yellow.300'}
      mr={2}
    />
  );
};

export default ColorModeSwitch;
