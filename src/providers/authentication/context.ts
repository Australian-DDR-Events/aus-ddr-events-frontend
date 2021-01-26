import { createContext } from 'react';
import { AuthenticationRepositoryContextInterface } from './types';

const initialContext = {
  authenticationRepositoryInstance: undefined,
};

// eslint-disable-next-line max-len
const AuthenticationRepositoryContext = createContext<AuthenticationRepositoryContextInterface>(
  initialContext,
);

export default AuthenticationRepositoryContext;
