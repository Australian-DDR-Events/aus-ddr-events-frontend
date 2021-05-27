import { AuthenticationRepositoryContext } from 'context/authentication';
import { useContext } from 'react';

const useAuthentication = () => useContext(AuthenticationRepositoryContext);

export default useAuthentication;
