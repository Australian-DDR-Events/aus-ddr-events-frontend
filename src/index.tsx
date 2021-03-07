import 'antd/dist/antd.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Skeleton } from 'antd';
import axios from 'axios';
import Router from 'components/router';
import Wrapper from 'components/wrapper';
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
import styled, { defaultSpacing } from 'types/styled-components';
import compose, { ComposeProps } from 'utils/compose';

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
    axiosClient,
  }),
);

const eventsRepositoryInstance = eventsRepository(
  eventsApiDao({
    axiosClient,
  }),
);

const SkeletonWrapper = styled.div`
  padding: ${defaultSpacing * 2}px;
`;

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
        <SkeletonWrapper>
          <Skeleton active />
        </SkeletonWrapper>
      ) : (
        <Router />
      )}
    </Wrapper>
  );
};

const providers: Array<ComposeProps> = [
  {
    Provider: AuthenticationRepositoryProvider,
    instance: authenticationRepositoryInstance,
  },
  {
    Provider: DancersRepositoryContextProvider,
    instance: dancersRepositoryInstance,
  },
  {
    Provider: SongsRepositoryProvider,
    instance: songsRepositoryInstance,
  },
  {
    Provider: ScoresRepositoryProvider,
    instance: scoresRepositoryInstance,
  },
  {
    Provider: IngredientsRepositoryProvider,
    instance: ingredientsRepositoryInstance,
  },
  {
    Provider: DishesRepositoryProvider,
    instance: dishesRepositoryInstance,
  },
  {
    Provider: BadgesRepositoryProvider,
    instance: badgesRepositoryInstance,
  },
  {
    Provider: EventsRepositoryProvider,
    instance: eventsRepositoryInstance,
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
      <App />
    </>,
  ),
  document.getElementById('root'),
);
