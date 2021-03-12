import {
  Center,
  ChakraProvider,
  ColorModeScript,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import Router from 'components/router';
import Wrapper from 'components/wrapper';
import {
  adminApiDao,
  adminRepository,
  AdminRepositoryProvider,
} from 'context/admin';
import {
  authenticationFirebaseDao,
  authenticationRepository,
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
  AuthenticationRepositoryProvider,
} from 'context/authentication';
import {
  badgesApiDao,
  badgesRepository,
  BadgesRepositoryProvider,
} from 'context/badges';
import {
  dancersApiDao,
  dancersRepository,
  DancersRepositoryContextProvider,
} from 'context/dancer';
import {
  dishesApiDao,
  dishesRepository,
  DishesRepositoryProvider,
} from 'context/dishes';
import {
  eventsApiDao,
  eventsRepository,
  EventsRepositoryProvider,
} from 'context/events';
import {
  ingredientsApiDao,
  ingredientsRepository,
  IngredientsRepositoryProvider,
} from 'context/ingredients';
import {
  scoresApiDao,
  scoresRepository,
  ScoresRepositoryProvider,
} from 'context/scores';
import {
  songsApiDao,
  songsRepository,
  SongsRepositoryProvider,
} from 'context/songs';
import dotenv from 'dotenv';
import firebase from 'firebase/app';
import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { HeadProvider, Title } from 'react-head';
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
const axiosClient = axios.create({
  baseURL: process.env.API_URL ?? '',
});

const authenticationRepositoryInstance = authenticationRepository(
  authenticationFirebaseDao(firebaseApp),
);
const getTokenOrDefault = async (): Promise<string> => {
  return (await firebaseApp.auth().currentUser?.getIdToken()) ?? '';
};
const dancersRepositoryInstance = dancersRepository(
  dancersApiDao({
    getIdTokenFunc: getTokenOrDefault,
    axiosClient,
  }),
);

const songsRepositoryInstance = songsRepository(
  songsApiDao({
    axiosClient,
  }),
);

const scoresRepositoryInstance = scoresRepository(
  scoresApiDao({
    getIdTokenFunc: getTokenOrDefault,
    axiosClient,
  }),
);

const ingredientsRepositoryInstance = ingredientsRepository(
  ingredientsApiDao({
    getIdTokenFunc: getTokenOrDefault,
    axiosClient,
  }),
);

const dishesRepositoryInstance = dishesRepository(
  dishesApiDao({
    getIdTokenFunc: getTokenOrDefault,
    axiosClient,
  }),
);

const badgesRepositoryInstance = badgesRepository(
  badgesApiDao({
    getIdTokenFunc: getTokenOrDefault,
    axiosClient,
  }),
);

const eventsRepositoryInstance = eventsRepository(
  eventsApiDao({
    axiosClient,
  }),
);

const adminRepositoryInstance = adminRepository(
  adminApiDao({
    getIdTokenFunc: getTokenOrDefault,
    axiosClient,
  }),
);

const App = (): React.ReactElement => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [loading, setLoading] = useState<boolean>(true);

  authRepo.authenticationRepositoryInstance.onAuthStateChanged(() => {
    setLoading(false);
  });

  return (
    <Wrapper>
      {loading ? (
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
  );
};

const providers: Array<ComposeProps> = [
  {
    Provider: AuthenticationRepositoryProvider,
    props: { instance: authenticationRepositoryInstance },
  },
  {
    Provider: DancersRepositoryContextProvider,
    props: { instance: dancersRepositoryInstance },
  },
  {
    Provider: SongsRepositoryProvider,
    props: { instance: songsRepositoryInstance },
  },
  {
    Provider: ScoresRepositoryProvider,
    props: { instance: scoresRepositoryInstance },
  },
  {
    Provider: IngredientsRepositoryProvider,
    props: { instance: ingredientsRepositoryInstance },
  },
  {
    Provider: DishesRepositoryProvider,
    props: { instance: dishesRepositoryInstance },
  },
  {
    Provider: BadgesRepositoryProvider,
    props: { instance: badgesRepositoryInstance },
  },
  {
    Provider: EventsRepositoryProvider,
    props: { instance: eventsRepositoryInstance },
  },
  {
    Provider: AdminRepositoryProvider,
    props: { instance: adminRepositoryInstance },
  },
  {
    Provider: HeadProvider,
  },
  {
    Provider: ChakraProvider,
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
