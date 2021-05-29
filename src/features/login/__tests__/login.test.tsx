import { ChakraProvider } from '@chakra-ui/react';
import { cleanup, render, screen } from '@testing-library/react';
import {
  AuthenticationRepository,
  AuthenticationRepositoryContextInterface,
  DefaultAuthenticationUser,
} from 'context/authentication';
import * as Authentication from 'context/authentication';
import React from 'react';
import { err } from 'types/result';

import Login from '..';

const ThemeWrapper = ({ children }: { children: any }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

const defaultAuthRepoInstance: AuthenticationRepository = {
  login: async () =>
    err(new Error('authentication repository not initialized'), ''),
  logout: async () =>
    err(new Error('authentication repository not initialized'), undefined),
  get: () =>
    err(
      new Error('authentication repository not initialized'),
      DefaultAuthenticationUser,
    ),
  register: async () =>
    err(new Error('authentication repository not initialized'), undefined),
  updatePassword: async () =>
    err(new Error('authentication repository not initialized'), undefined),
  sendPasswordResetEmail: async () =>
    err(new Error('authentication repository not initialized'), undefined),
  getClaim: async () =>
    err(new Error('authentication repository not initialized'), undefined),
  onAuthStateChanged: () => {},
};

const setUpMockAuthRepo = ({
  login,
  logout,
  get,
  register,
  updatePassword,
  sendPasswordResetEmail,
  getClaim,
  onAuthStateChanged,
}: AuthenticationRepository): AuthenticationRepositoryContextInterface => ({
  authenticationRepositoryInstance: {
    login,
    logout,
    get,
    register,
    updatePassword,
    sendPasswordResetEmail,
    getClaim,
    onAuthStateChanged,
  },
});

describe('Login', () => {
  jest.mock('context/authentication');
  const useAuthenticationSpy = jest.spyOn(Authentication, 'useAuthentication');
  beforeEach(() => {
    useAuthenticationSpy.mockReturnValue(
      setUpMockAuthRepo({
        ...defaultAuthRepoInstance,
      }),
    );
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render LoginForm', async () => {
    render(<Login />, { wrapper: ThemeWrapper });
    expect(await screen.findByText('Login')).toBeTruthy();
    // expect(await screen.findByRole(LoginForm)).toBeTruthy();
  });
});
