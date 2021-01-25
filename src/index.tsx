import dotenv from 'dotenv';
import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import authenticationFirebaseDao from './services/authentication/authenticationFirebaseDao';
import authenticationRepository from './services/authentication/authenticationRepository';
import AuthenticationRepositoryProvider from './services/authentication/authenticationRepositoryProvider';

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

ReactDOM.render(
  <AuthenticationRepositoryProvider
    authenticationRepositoryInstance={authenticationRepositoryInstance}
  >
    <App />
  </AuthenticationRepositoryProvider>,
  document.getElementById('root'),
);
