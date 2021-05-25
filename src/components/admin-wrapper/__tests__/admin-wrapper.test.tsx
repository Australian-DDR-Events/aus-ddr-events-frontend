import 'jsdom-global/register';

import { ChakraProvider, theme } from '@chakra-ui/react';
import { act, render, screen, waitFor } from '@testing-library/react';
import AdminWrapper from 'components/admin-wrapper';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { when } from 'jest-when';
import React from 'react';
import { err, ok } from 'types/result';

const ThemeWrapper = ({ children }: { children: any }) => (
  <ChakraProvider resetCSS theme={theme}>
    {children}
  </ChakraProvider>
);

describe('AdminWrapper', () => {
  const setUpMockAuthRepo = ({
    login = jest.fn(),
    logout = jest.fn(),
    get = jest.fn(),
    register = jest.fn(),
    updatePassword = jest.fn(),
    sendPasswordResetEmail = jest.fn(),
    getClaim = jest.fn(),
    onAuthStateChanged = jest.fn(),
  }: {
    login?: Function | undefined;
    logout?: Function | undefined;
    get?: Function | undefined;
    register?: Function | undefined;
    updatePassword?: Function | undefined;
    sendPasswordResetEmail?: Function | undefined;
    getClaim?: Function | undefined;
    onAuthStateChanged?: Function | undefined;
  }) => ({
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

  const useContextSpy = jest.spyOn(React, 'useContext');

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when user is an admin', () => {
    test('should render children', async () => {
      when(useContextSpy)
        .calledWith(expect.objectContaining(AuthenticationRepositoryContext))
        .mockReturnValue(
          setUpMockAuthRepo({
            getClaim: async () => ok('admin'),
          }),
        );

      await act(async () => {
        render(
          <AdminWrapper>
            <div data-testid="adminOnly">Test</div>
          </AdminWrapper>,
          { wrapper: ThemeWrapper },
        );
        await waitFor(() =>
          expect(screen.getByText('Test')).toBeInTheDocument(),
        );
      });
    });
  });

  describe('when user is not an admin', () => {
    test('should not render the children', async () => {
      when(useContextSpy)
        .calledWith(expect.objectContaining(AuthenticationRepositoryContext))
        .mockReturnValue(
          setUpMockAuthRepo({
            getClaim: async () => err(new Error(''), ''),
          }),
        );

      await act(async () => {
        render(
          <AdminWrapper>
            <div data-testid="adminOnly">Test</div>
          </AdminWrapper>,
          { wrapper: ThemeWrapper },
        );
        await waitFor(() =>
          expect(screen.getByText('Test')).not.toBeInTheDocument(),
        );
      });
    });
  });
});
