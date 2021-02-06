import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultAuthenticationUser } from 'context/authentication/index';
import { AuthenticationRepositoryContextInterface } from './types';

const initialContext = {
  authenticationRepositoryInstance: {
    login: async () =>
      err(new Error('authentication repository not initialized'), ''),
    logout: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    get: () =>
      err(
        new Error('authentication repository not initialized'),
        DefaultAuthenticationUser,
      ),
    register: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    updatePassword: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    sendPasswordResetEmail: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    onAuthStateChanged: () => {},
  },
};

// eslint-disable-next-line max-len
const AuthenticationRepositoryContext = createContext<AuthenticationRepositoryContextInterface>(
  initialContext,
);

export default AuthenticationRepositoryContext;
