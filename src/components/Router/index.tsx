import React from 'react';
import { Route, Switch } from 'wouter';
import LoginForm from '../LoginForm';

const Router = () => (
  <Switch>
    <Route path="/">
      <p>hello</p>
    </Route>
    <Route path="/login">
      <LoginForm />
    </Route>
    <Route>
      <p>Error</p>
    </Route>
  </Switch>
);

export default Router;
