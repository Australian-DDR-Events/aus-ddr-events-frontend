import { createContext } from 'react';
import { err } from '../../common/Result';
import { DefaultUser } from './constants';
import { UserRepositoryContextInterface } from './types';

const initialContext = {
  userRepositoryInstance: {
    get: async () =>
      err(new Error('user repository not initialized'), DefaultUser),
    update: async () =>
      err(new Error('user repository not initialized'), false),
  },
};

const UserRepositoryContext = createContext<UserRepositoryContextInterface>(
  initialContext,
);

export default UserRepositoryContext;
