import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, waitFor } from '@testing-library/react';
import AdminWrapper from 'components/admin-wrapper';
import React from 'react';
import { ok } from 'types/result';

const mockIsAdmin = jest.fn();
jest.mock('hooks/use-authentication', () => {
  return {
    useAuthentication: () => ({
      isAdmin: mockIsAdmin,
    }),
  };
});

describe('AdminWrapper', () => {
  describe('when user is an admin', () => {
    test('should render children', async () => {
      mockIsAdmin.mockReturnValue(Promise.resolve(ok(true)));
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
      mockIsAdmin.mockReturnValue(Promise.resolve(ok(false)));
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
