import React, { useContext, useState } from 'react';
import 'antd/dist/antd.css';
import Wrapper from './components/Wrapper';
import Router from './components/Router';
import { AuthenticationRepositoryContextInterface } from './services/authentication/types';
import { AuthenticationRepositoryContext } from './services/authentication/authenticationRepositoryContext';

const App = (): React.ReactElement => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [loading, setLoading] = useState<boolean>(true);

  authRepo.authenticationRepositoryInstance?.onAuthStateChanged(() => {
    setLoading(false);
  });

  return <Wrapper>{loading ? <>Loading</> : <Router />}</Wrapper>;
};

export default App;
