import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import React, { ReactChild, useContext, useEffect, useState } from 'react';

const AdminWrapper = ({
  children,
}: {
  children: ReactChild | ReactChild[];
}) => {
  const authRepo = useContext(AuthenticationRepositoryContext);

  const [isAdmin, setIsAdmin] = useState(false);

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
