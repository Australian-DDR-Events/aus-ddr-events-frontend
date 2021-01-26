import React, { ReactNode } from 'react';
import { UserRepositoryContext } from './userRepositoryContext';
import { UserRepository } from './types';

export interface UserRepositoryProviderOptions {
  children?: ReactNode;
  userRepositoryInstance: UserRepository;
}

const UserRepositoryProvider = (options: UserRepositoryProviderOptions) => (
  <UserRepositoryContext.Provider
    value={{ userRepositoryInstance: options.userRepositoryInstance }}
  >
    {options.children}
  </UserRepositoryContext.Provider>
);

export default UserRepositoryProvider;
