import dotenv from 'dotenv';
import firebase from 'firebase';
import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { Skeleton } from 'antd';
import {
  authenticationFirebaseDao,
  authenticationRepository,
  AuthenticationRepositoryProvider,
  AuthenticationRepositoryContextInterface,
  AuthenticationRepositoryContext,
} from 'context/authentication';
import Wrapper from 'components/wrapper';
import Router from 'components/router';
import {
  DancersRepositoryContextProvider,
  dancersRepository,
  dancersApiDao,
} from 'context/dancer';
import 'antd/dist/antd.css';
import styled, { defaultSpacing } from 'types/styled-components';
import { HeadProvider, Title } from 'react-head';
import {
  songsApiDao,
  songsRepository,
  SongsRepositoryProvider,
} from 'context/songs';
import {
  scoresApiDao,
  scoresRepository,
  ScoresRepositoryProvider,
} from 'context/scores';
import {
  ingredientsApiDao,
  ingredientsRepository,
  IngredientsRepositoryProvider,
} from 'context/ingredients';
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

const authenticationRepositoryInstance = authenticationRepository(
  authenticationFirebaseDao(firebaseApp),
);
const getTokenOrDefault = async (): Promise<string> => {
  return (await firebaseApp.auth().currentUser?.getIdToken()) ?? '';
};
const dancersRepositoryInstance = dancersRepository(
  dancersApiDao({
    getIdTokenFunc: getTokenOrDefault,
    baseApiUrl: process.env.API_URL ?? '',
    assetsUrl: process.env.ASSETS_URL ?? '',
  }),
);

const songsRepositoryInstance = songsRepository(
  songsApiDao({
    getIdTokenFunc: getTokenOrDefault,
    baseApiUrl: process.env.API_URL ?? '',
  }),
);

const scoresRepositoryInterface = scoresRepository(
  scoresApiDao({
    getIdTokenFunc: getTokenOrDefault,
    baseApiUrl: process.env.API_URL ?? '',
  }),
);

const ingredientsRepositoryInterface = ingredientsRepository(
  ingredientsApiDao({
    getIdTokenFunc: getTokenOrDefault,
    baseApiUrl: process.env.API_URL ?? '',
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
    instance: scoresRepositoryInterface,
  },
  {
    Provider: IngredientsRepositoryProvider,
    instance: ingredientsRepositoryInterface,
  },
  {
    Provider: HeadProvider,
  }
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
