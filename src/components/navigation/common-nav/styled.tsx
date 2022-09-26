import { Avatar, AvatarProps } from '@chakra-ui/react';
import { IoPersonCircle } from '@react-icons/all-files/io5/IoPersonCircle';
import React from 'react';

export const NavBarProfilePictureIcon = (props: AvatarProps) => (
  <Avatar
    size="md"
    showBorder
    borderColor="blue.500"
    borderWidth={2}
    icon={<IoPersonCircle />}
    {...props}
  />
);
