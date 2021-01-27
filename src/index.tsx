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
} from './context/authentication';
import {
  UserRepositoryContextProvider,
  userFirebaseDao,
  userRepository,
} from './context/user';
import Wrapper from './components/wrapper';
import Router from './components/router';
import 'antd/dist/antd.css';

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

const userRepositoryInstance = userRepository(userFirebaseDao(firebaseApp));

const App = (): React.ReactElement => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [loading, setLoading] = useState<boolean>(true);

  authRepo.authenticationRepositoryInstance.onAuthStateChanged(() => {
    setLoading(false);
  });

  return <Wrapper>{loading ? <Skeleton active /> : <Router />}</Wrapper>;
};

ReactDOM.render(
  <AuthenticationRepositoryProvider
    authenticationRepositoryInstance={authenticationRepositoryInstance}
  >
    <UserRepositoryContextProvider
      userRepositoryInstance={userRepositoryInstance}
    >
      <App />
    </UserRepositoryContextProvider>
  </AuthenticationRepositoryProvider>,
  document.getElementById('root'),
);
