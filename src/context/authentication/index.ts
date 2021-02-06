import AuthenticationRepositoryProvider from './provider';
import AuthenticationRepositoryContext from './context';
import {
  AuthenticationRepositoryContextInterface,
  AuthStateChangedCallback,
} from './types';
import authenticationFirebaseDao from './firebase-dao';
import authenticationRepository from './authentication-repository';
import { DefaultAuthenticationUser } from './constants';

export {
  AuthenticationRepositoryProvider,
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
  authenticationFirebaseDao,
  authenticationRepository,
  DefaultAuthenticationUser,
};

export type AuthStateChangedCallbackType = AuthStateChangedCallback;
