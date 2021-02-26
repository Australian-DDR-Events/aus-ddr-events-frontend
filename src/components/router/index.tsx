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
import Submission from 'features/submission';
import Error from 'features/error';
import { Title } from 'react-head';
import Scores from 'features/scores';

const ProtectedRoute = (props: RouteProps) => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [, setLocation] = useLocation();
  useEffect(() => {
    const loggedInUser = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();
    if (!loggedInUser.id) {
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
    <Route path="/scores">
      <Scores />
    </Route>
    <ProtectedRoute path="/profile">
      <Title>Profile | Australian DDR Events</Title>
      <Profile />
    </ProtectedRoute>
    <ProtectedRoute path="/profile/:id">
      <Title>Profile | Australian DDR Events</Title>
      {(params) => <Profile id={params.id} />}
    </ProtectedRoute>
    <ProtectedRoute path="/submission">
      <Title>Submit Scores | Australian DDR Events</Title>
      <Submission />
    </ProtectedRoute>
    <ProtectedRoute path="/settings">
      <Title>Settings | Australian DDR Events</Title>
      <Settings />
    </ProtectedRoute>
    <Route>
      <Error />
    </Route>
  </Switch>
);

export default Router;
