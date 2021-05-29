import { Center, Spinner } from '@chakra-ui/react';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import Router from 'components/router';
import Wrapper from 'components/wrapper';
import { AuthenticationProvider } from 'context/authentication';
import { FirebaseUserProvider } from 'context/firebase-user';
import firebase from 'firebase';
import { LoggedInUser } from 'hooks/use-authentication/types';
import useFirebaseAuthentication from 'hooks/use-firebase-authentication';
import React, { useMemo, useState } from 'react';
import { createClient, Provider as UrqlProvider } from 'urql';
import compose, { ComposeProps } from 'utils/compose';

const App = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

  const firebaseAuth = useFirebaseAuthentication({
    firebaseUser,
    setFirebaseUser,
    setLoggedInUser,
    handleAuthChanged: (user: firebase.User | null) => {
      setFirebaseUser(user);
      setIsLoading(false);
    },
  });

  const urqlClient = useMemo(
    () =>
      createClient({
        url: `${process.env.API_URL}/graphql`,
        fetchOptions: {
          headers: {
            authorization: loggedInUser?.token
              ? `Bearer ${loggedInUser.token}`
              : '',
          },
        },
        exchanges: [multipartFetchExchange],
      }),
    [loggedInUser],
  );

  const appProviders: Array<ComposeProps> = [
    {
      Provider: FirebaseUserProvider,
      props: {
        firebaseUser,
        setFirebaseUser,
      },
    },
    {
      Provider: AuthenticationProvider,
      props: {
        authenticationScheme: {
          loggedInUser,
          setLoggedInUser,
          ...firebaseAuth,
        },
      },
    },
    {
      Provider: UrqlProvider,
      props: {
        value: urqlClient,
      },
    },
  ];

  return compose(
    appProviders,
    <Wrapper>
      {isLoading ? (
        <Center>
          <Spinner // todo: replace this with proper skeleton structure
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        <Router />
      )}
    </Wrapper>,
  );
};

export default App;
