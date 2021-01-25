import { createContext } from 'react';
import { AuthenticationRepositoryContextInterface } from './types';

const initialContext = {
  authenticationRepositoryInstance: undefined,
};

export const AuthenticationRepositoryContext = createContext<AuthenticationRepositoryContextInterface>(
  initialContext,
);
