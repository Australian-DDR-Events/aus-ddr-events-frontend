import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

const AdminWrapper = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const authRepo = useContext(AuthenticationRepositoryContext);

  useEffect(() => {
    authRepo.authenticationRepositoryInstance
      .getClaim('admin')
      .then((result) => {
        if (result.isOk() && result.okOrDefault()) {
          setIsAdmin(true);
        }
      });
  }, []);

  return (
    <>
      {isAdmin && (
        <>
          <Alert status="error">
            <AlertIcon />
            <Box flex="1" textAlign="left">
              <AlertTitle mr={2}>This is admin only functionality!</AlertTitle>
              <AlertDescription>Please proceed with caution.</AlertDescription>
            </Box>
          </Alert>
          {children}
        </>
      )}
    </>
  );
};

export default AdminWrapper;
