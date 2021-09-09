import { createContext, useContext } from 'react';

import { AuthenticationService } from './types';

const AuthenticationContext = createContext<
  (() => AuthenticationService) | undefined
>(undefined);

const useAuthentication = (): AuthenticationService => {
  const auth = useContext(AuthenticationContext);
  if (auth === undefined)
    throw new Error('useAuthentication must be initialised');
  return auth();
};

export { AuthenticationContext, useAuthentication };
