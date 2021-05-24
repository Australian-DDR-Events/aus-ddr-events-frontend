import { Text } from '@chakra-ui/react';
import React from 'react';

const Copyright = () => (
  <Text fontSize="sm">
    Copyright &copy; {new Date().getFullYear()} Australian DDR Events.
  </Text>
);

export default Copyright;
