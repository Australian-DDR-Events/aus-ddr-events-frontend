import {
  Center,
  ChakraProvider,
  ColorModeScript,
  Spinner,
} from '@chakra-ui/react';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import Router from 'components/router';
import Wrapper from 'components/wrapper';
import {
  authenticationFirebaseDao,
  authenticationRepository,
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
  AuthenticationRepositoryProvider,
} from 'context/authentication';
import { EndpointProvider } from 'context/use-endpoint';
import dotenv from 'dotenv';
import firebase from 'firebase/app';
import React, { useContext, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { HeadProvider, Title } from 'react-head';
import { createClient, Provider as UrqlProvider } from 'urql';
import compose, { ComposeProps } from 'utils/compose';

import theme from './theme';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const authenticationRepositoryInstance = authenticationRepository(
  authenticationFirebaseDao(firebaseApp),
);

const App = (): React.ReactElement => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [authId, setAuthId] = useState<string | undefined>(undefined);

  const urqlClient = useMemo(
    () =>
      createClient({
        url: `${process.env.API_URL}/graphql`,
        fetchOptions: {
          headers: { authorization: authId ? `Bearer ${authId}` : '' },
        },
        exchanges: [multipartFetchExchange],
      }),
    [authId],
  );

  authRepo.authenticationRepositoryInstance.onAuthStateChanged(
    async (result) => {
      setAuthId(result.token || '');
    },
  );

  return (
    <UrqlProvider value={urqlClient}>
      <Wrapper>
        {authId === undefined ? (
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
      </Wrapper>
    </UrqlProvider>
  );
};

const providers: Array<ComposeProps> = [
  {
    Provider: AuthenticationRepositoryProvider,
    props: { instance: authenticationRepositoryInstance },
  },
  {
    Provider: HeadProvider,
  },
  {
    Provider: ChakraProvider,
  },
  {
    Provider: EndpointProvider,
    props: { baseUrl: 'http://localhost:5000' },
  },
];

ReactDOM.render(
  compose(
    providers,
    <>
      <Title>Australian DDR Events</Title>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </>,
  ),
  document.getElementById('root'),
);
