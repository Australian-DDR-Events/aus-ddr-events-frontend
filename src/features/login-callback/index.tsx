import { Center, Spinner } from '@chakra-ui/react';
import { useAuthChanged } from 'hooks/use-auth-changed';
import React, { useEffect } from 'react';
import { useLoginConnection } from 'services/connections';
import { useLocation } from 'wouter';

const LoginCallback = () => {
  const [, setLocation] = useLocation();
  const { trigger, setTrigger } = useAuthChanged();
  const params = new URLSearchParams(window.location.search);
  if (!params.has('code')) {
    setLocation('/');
    return <></>;
  }

  const [loading, success] = useLoginConnection(params.get('code')!);

  useEffect(() => {
    if (success && !loading) {
      setTrigger(!trigger);
      setLocation('/profile/start');
    } else if (!loading) {
      setLocation('/');
    }
  }, [success, loading]);

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

export default LoginCallback;
