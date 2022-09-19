import { Center, Spinner } from '@chakra-ui/react';
import { useAuthChanged } from 'hooks/use-auth-changed';
import React, { useEffect } from 'react';
import { useLogoutConnection } from 'services/connections';

const LogoutCallback = () => {
  const [loading] = useLogoutConnection();
  const { trigger, setTrigger } = useAuthChanged();

  useEffect(() => {
    if (!loading) {
      setTrigger(!trigger);
      window.location.assign('/');
    }
  }, [loading]);

  return (
    <Center>
      <Spinner // todo: replace this with proper skeleton structure
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};

export default LogoutCallback;
