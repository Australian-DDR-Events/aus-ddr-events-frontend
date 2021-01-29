import AuthenticationRepositoryProvider from './provider';
import AuthenticationRepositoryContext from './context';
import {
  AuthenticationRepositoryContextInterface,
  AuthStateChangedCallback,
} from './types';
import authenticationFirebaseDao from './firebase-dao';
import authenticationRepository from './authentication-repository';

export {
  AuthenticationRepositoryProvider,
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
  authenticationFirebaseDao,
  authenticationRepository,
};

export type AuthStateChangedCallbackType = AuthStateChangedCallback;
