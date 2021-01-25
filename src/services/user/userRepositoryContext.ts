import { createContext } from 'react';
import { UserRepository } from './types';

export interface UserRepositoryContextInterface {
  userRepositoryInstance?: UserRepository;
}

const initialContext = {
  userRepositoryInstance: undefined,
};

export const UserRepositoryContext = createContext<UserRepositoryContextInterface>(
  initialContext,
);
