import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultUser } from './constants';
import { Song, UserRepositoryContextInterface } from './types';

const initialContext = {
  userRepositoryInstance: {
    get: async () =>
      err(new Error('user repository not initialized'), DefaultUser),
    update: async () =>
      err(new Error('user repository not initialized'), false),
    submitScore: async () =>
      err(new Error('user repository not initialized'), false),
    getSongs: async () =>
      err(new Error('user repository not initialized'), new Array<Song>()),
  },
};

const UserRepositoryContext = createContext<UserRepositoryContextInterface>(
  initialContext,
);

export default UserRepositoryContext;
