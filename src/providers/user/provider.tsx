import React from 'react';
import UserRepositoryContext from './context';
import { UserRepositoryProviderOptions } from './types';

const UserRepositoryProvider = (options: UserRepositoryProviderOptions) => (
  <UserRepositoryContext.Provider
    value={{ userRepositoryInstance: options.userRepositoryInstance }}
  >
    {options.children}
  </UserRepositoryContext.Provider>
);

export default UserRepositoryProvider;
