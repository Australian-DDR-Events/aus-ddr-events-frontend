import React from 'react';

import { AuthenticationContext } from './authenticationContext';
import { AuthenticationService } from './types';

const AuthenticationProvider = ({
  context,
  children,
}: {
  context: () => AuthenticationService;
  children: React.ReactNode;
}) => {
  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
