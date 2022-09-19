import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Dancer } from 'services/dancers';

interface AdminWrapperProps {
  user: Dancer;
  children: ReactNode;
}

const AdminWrapper = (props: AdminWrapperProps) => {
  return (
    <>
      {props.user.userRoles?.some((v) => v.toLowerCase() == 'admin') && (
        <>
          <Alert status="error">
            <AlertIcon />
            <Box flex="1" textAlign="left">
              <AlertTitle mr={2}>This is admin only functionality!</AlertTitle>
              <AlertDescription>Please proceed with caution.</AlertDescription>
            </Box>
          </Alert>
          {props.children}
        </>
      )}
    </>
  );
};

export default AdminWrapper;
