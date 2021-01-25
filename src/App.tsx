import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationRepositoryContext } from './services/authentication/authenticationRepositoryContext';
import AuthenticationRepositoryProvider from './services/authentication/authenticationRepositoryProvider';
import { AuthenticationRepositoryContextInterface } from './services/authentication/types';
import 'antd/dist/antd.css';
import Wrapper from './components/Wrapper';
import LoginForm from './components/LoginForm';

const App = (): React.ReactElement => {
  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  );
};

export default App;
