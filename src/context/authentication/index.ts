import authenticationRepository from './authentication-repository';
import { DefaultAuthenticationUser } from './constants';
import AuthenticationRepositoryContext from './context';
import authenticationFirebaseDao from './firebase-dao';
import AuthenticationRepositoryProvider from './provider';
import {
  AuthenticationRepository,
  AuthenticationRepositoryContextInterface,
  AuthenticationUser,
  AuthStateChangedCallback,
} from './types';
import useAuthentication from './use-authentication';

export {
  authenticationFirebaseDao,
  AuthenticationRepository,
  authenticationRepository,
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
  AuthenticationRepositoryProvider,
  AuthenticationUser,
  DefaultAuthenticationUser,
  useAuthentication,
};

export type AuthStateChangedCallbackType = AuthStateChangedCallback;
