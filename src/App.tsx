import React, { useContext, useState } from 'react';
import 'antd/dist/antd.css';
import { Skeleton } from 'antd';
import Wrapper from './view/wrapper';
import Router from './view/router';
import {
  AuthenticationRepositoryContextInterface,
  AuthenticationRepositoryContext,
} from './providers/authentication';

const App = (): React.ReactElement => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [loading, setLoading] = useState<boolean>(true);

  authRepo.authenticationRepositoryInstance.onAuthStateChanged(() => {
    setLoading(false);
  });

  return <Wrapper>{loading ? <Skeleton active /> : <Router />}</Wrapper>;
};

export default App;
