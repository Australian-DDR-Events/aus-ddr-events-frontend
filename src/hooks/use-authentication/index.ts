import { AuthenticationContext } from 'context/authentication';
import { useContext } from 'react';

import { UseAuthentication } from './types';

const useAuthentication = (): UseAuthentication => {
  const auth = useContext(AuthenticationContext);
  return auth;
};

export default useAuthentication;
