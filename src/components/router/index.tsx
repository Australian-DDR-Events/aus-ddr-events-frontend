import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from 'context/authentication';
import CourseSubmission from 'features/course-submission';
import Error from 'features/error';
import ForgotPassword from 'features/forgot-password';
import Home from 'features/home';
import HowTo from 'features/how-to';
import IngredientSubmission from 'features/ingredient-submission';
import Login from 'features/login';
import Profile from 'features/profile';
import Register from 'features/register';
import Settings from 'features/settings';
import React, { useContext, useEffect } from 'react';
import { Title } from 'react-head';
import { Route, RouteProps, Switch, useLocation } from 'wouter';

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

  return <Route {...props} />;
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
      <Title>Forgot password | Australian DDR Events</Title>
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
      {(params) => (
        <>
          <Title>Profile | Australian DDR Events</Title>
          <Profile id={params.id} />
        </>
      )}
    </ProtectedRoute>
    <ProtectedRoute path="/submission">
      <Title>Submit scores | Australian DDR Events</Title>
      <IngredientSubmission />
    </ProtectedRoute>
    <ProtectedRoute path="/course-submission">
      <Title>Submit courses | Australian DDR Events</Title>
      <CourseSubmission />
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
