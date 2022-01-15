import { Box, Stack } from '@chakra-ui/react';
import React from 'react';

import Copyright from './copyright';

const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    mx="auto"
    maxW="7xl"
    py="12"
    px={{ base: '4', md: '8' }}
  >
    <Stack
      direction={{ base: 'column-reverse', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Copyright />
    </Stack>
  </Box>
);

export default Footer;
