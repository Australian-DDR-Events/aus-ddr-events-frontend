import { Button } from '@chakra-ui/react';
import React from 'react';

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

export default MenuItem;
