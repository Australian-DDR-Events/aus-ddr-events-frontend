import React from 'react';
import { err } from 'types/result';

import { AuthenticationContextParams } from './types';

const AuthenticationContext = React.createContext<AuthenticationContextParams>({
  loggedInUser: null,
  setLoggedInUser: () => {},
  login: async () =>
    err(new Error('authentication repository not initialized'), ''),
  logout: async () =>
    err(new Error('authentication repository not initialized'), undefined),
  register: async () =>
    err(new Error('authentication repository not initialized'), undefined),
  sendPasswordResetEmail: async () =>
    err(new Error('authentication repository not initialized'), undefined),
  isAdmin: async () =>
    err(new Error('authentication repository not initialized'), false),
  onAuthStateChanged: () => {},
});

const AuthenticationProvider = ({
  children,
  authenticationScheme,
}: {
  authenticationScheme: AuthenticationContextParams;
  children: React.ReactNode;
}) => {
  return (
    <AuthenticationContext.Provider value={{ ...authenticationScheme }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };
