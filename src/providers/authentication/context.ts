import { createContext } from 'react';
import { err } from '../../common/Result';
import { AuthenticationRepositoryContextInterface } from './types';

const initialContext = {
  authenticationRepositoryInstance: {
    login: async () =>
      err(new Error('authentication repository not initialized'), ''),
    logout: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    get: () => err(new Error('authentication repository not initialized'), ''),
    signUp: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    updatePassword: async () =>
      err(new Error('authentication repository not initialized'), undefined),
    onAuthStateChanged: () => {},
  },
};

// eslint-disable-next-line max-len
const AuthenticationRepositoryContext = createContext<AuthenticationRepositoryContextInterface>(
  initialContext,
);

export default AuthenticationRepositoryContext;
