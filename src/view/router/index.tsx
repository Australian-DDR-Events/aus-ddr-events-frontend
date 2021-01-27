import React, { useContext, useEffect } from 'react';
import { Route, RouteProps, Switch, useLocation } from 'wouter';
import LoginForm from '../login-form';
import {
  AuthenticationRepositoryContextInterface,
  AuthenticationRepositoryContext,
} from '../../providers/authentication';
import Profile from '../profile';

const ProtectedRoute = (props: RouteProps) => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [, setLocation] = useLocation();
  useEffect(() => {
    const loggedInUserId = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();
    if (!loggedInUserId) {
      setLocation('/login');
    }
  }, []);

  return <Route {...props}>{props.children}</Route>;
};

const Router = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );

  const loggedInUserId = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();

  return (
    <Switch>
      <Route path="/">
        <p>hello {loggedInUserId}</p>
      </Route>
      <Route path="/login">
        <LoginForm />
      </Route>
      <ProtectedRoute path="/profile">
        <Profile />
      </ProtectedRoute>
      <Route>
        <p>Error</p>
      </Route>
    </Switch>
  );
};

export default Router;
