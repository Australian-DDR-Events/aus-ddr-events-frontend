import React, { useContext } from 'react';
import { Route, Switch } from 'wouter';
import LoginForm from '../LoginForm';
import { AuthenticationRepositoryContextInterface } from '../../services/authentication/types';
import { AuthenticationRepositoryContext } from '../../services/authentication/authenticationRepositoryContext';

const Router = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );

  const userResult = authRepo.authenticationRepositoryInstance?.get();
  const userId = userResult?.isOk() ? userResult.value : '';

  return (
    <Switch>
      <Route path="/">
        <p>hello {userId}</p>
      </Route>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route>
        <p>Error</p>
      </Route>
    </Switch>
  );
};

export default Router;
