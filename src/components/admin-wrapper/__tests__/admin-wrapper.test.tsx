import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, waitFor } from '@testing-library/react';
import AdminWrapper from 'components/admin-wrapper';
import {
  AuthenticationRepository,
  AuthenticationRepositoryContextInterface,
  DefaultAuthenticationUser,
} from 'context/authentication';
import * as Authentication from 'context/authentication';
import React from 'react';
import { err, ok, Result } from 'types/result';

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
  login = jest.fn(),
  logout = jest.fn(),
  get = jest.fn(),
  register = jest.fn(),
  updatePassword = jest.fn(),
  sendPasswordResetEmail = jest.fn(),
  getClaim = jest.fn(),
  onAuthStateChanged = jest.fn(),
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

describe('AdminWrapper', () => {
  let useAuthenticationSpy: jest.SpyInstance<
    AuthenticationRepositoryContextInterface,
    []
  >;
  beforeEach(() => {
    // jest.mock('context/authentication');
    useAuthenticationSpy = jest.spyOn(Authentication, 'useAuthentication');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('when user is an admin', () => {
    test('should render children', async () => {
      useAuthenticationSpy.mockReturnValue(
        setUpMockAuthRepo({
          ...defaultAuthRepoInstance,
          getClaim: async () => ok('admin2'),
        }),
      );
      render(
        <AdminWrapper>
          <div data-testid="adminOnly">Test</div>
        </AdminWrapper>,
        { wrapper: ChakraProvider },
      );
      await waitFor(() => {
        expect(screen.getByTestId('adminOnly')).toBeInTheDocument();
      });
    });
  });

  describe('when user is not an admin', () => {
    test('should not render the children', async () => {
      useAuthenticationSpy.mockReturnValue(
        setUpMockAuthRepo({
          ...defaultAuthRepoInstance,
          getClaim: async (): Promise<Result<Error, any>> =>
            err(new Error(''), undefined),
        }),
      );
      render(
        <AdminWrapper>
          <div data-testid="adminOnly">Test</div>
        </AdminWrapper>,
        { wrapper: ChakraProvider },
      );
      await waitFor(() => {
        expect(screen.queryByTestId('adminOnly')).toBeNull();
      });
    });
  });
});
