import React, { useContext, useEffect } from 'react';
import { Route, RouteProps, Switch, useLocation } from 'wouter';
import Login from 'features/login';
import {
  AuthenticationRepositoryContextInterface,
  AuthenticationRepositoryContext,
} from 'context/authentication';
import Profile from 'features/profile';
import Settings from 'features/settings';
import Register from 'features/register';
import Home from 'features/home';
import ForgotPassword from 'features/forgot-password';
import HowTo from 'features/how-to';
import { Title } from 'react-head';

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
      <Title>Australian DDR Events</Title>
      <Home />
    </Route>
    <Route path="/login">
      <Title>Login | Australian DDR Events</Title>
      <Login />
    </Route>
    <Route path="/register">
      <Title>Register | Australian DDR Events</Title>
      <Register />
    </Route>
    <Route path="/forgot-password">
      <Title>Forgot Password | Australian DDR Events</Title>
      <ForgotPassword />
    </Route>
    <Route path="/how-to">
      <Title>How to participate | Australian DDR Events</Title>
      <HowTo />
    </Route>
    <ProtectedRoute path="/profile">
      <Title>Profile | Australian DDR Events</Title>
      <Profile />
    </ProtectedRoute>
    <ProtectedRoute path="/profile/:id">
      <Title>Profile | Australian DDR Events</Title>
      {(params) => <Profile id={params.id} />}
    </ProtectedRoute>
    <ProtectedRoute path="/settings">
      <Title>Settings | Australian DDR Events</Title>
      <Settings />
    </ProtectedRoute>
    <Route>
      <Title>Error | Australian DDR Events</Title>
      <p>Error</p>
    </Route>
  </Switch>
);

export default Router;
