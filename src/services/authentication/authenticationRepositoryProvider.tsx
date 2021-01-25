import React, { ReactNode } from 'react';
import { AuthenticationRepositoryContext } from './authenticationRepositoryContext';
import { AuthenticationRepositoryProviderOptions } from './types';

const AuthenticationRepositoryProvider = (
  options: AuthenticationRepositoryProviderOptions,
) => (
  <AuthenticationRepositoryContext.Provider
    value={{
      authenticationRepositoryInstance:
        options.authenticationRepositoryInstance,
    }}
  >
    {options.children}
  </AuthenticationRepositoryContext.Provider>
);

export default AuthenticationRepositoryProvider;
