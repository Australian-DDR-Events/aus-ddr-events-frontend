import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import { useAuthentication } from 'hooks/use-authentication';
import React, { ReactNode, useEffect, useState } from 'react';

const AdminWrapper = ({ children }: { children: ReactNode }) => {
  const { getClaim } = useAuthentication();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const groups = getClaim<Array<string>>('cognito:groups');
    if (groups.isOk()) {
      setIsAdmin(!!groups.value?.includes('Administrators'));
    }
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
