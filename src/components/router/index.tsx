import React, { useContext, useEffect } from 'react';
import { Route, RouteProps, Switch, useLocation } from 'wouter';
import Login from '~/features/login';
import {
  AuthenticationRepositoryContextInterface,
  AuthenticationRepositoryContext,
} from '~/context/authentication';
import Profile from '~/features/profile';
import Settings from '~/features/settings';
import Register from '~/features/register';
import Home from '~/features/home';
import ForgotPassword from '~/features/forgot-password';

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

const Router = () => (
  <Switch>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/forgot-password">
      <ForgotPassword />
    </Route>
    <ProtectedRoute path="/profile">
      <Profile />
    </ProtectedRoute>
    <ProtectedRoute path="/profile/:id">
      {(params) => <Profile id={params.id} />}
    </ProtectedRoute>
    <ProtectedRoute path="/settings">
      <Settings />
    </ProtectedRoute>
    <Route>
      <p>Error</p>
    </Route>
  </Switch>
);

export default Router;
