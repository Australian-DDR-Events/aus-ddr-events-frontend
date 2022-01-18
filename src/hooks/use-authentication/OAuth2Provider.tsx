import React, { ReactNode } from 'react';
import { AuthProvider, AuthService, useAuth } from 'react-oauth2-pkce';
import { err, ok, Result } from 'types/result';

import AuthenticationProvider from './authenticationProvider';
import { AuthenticationService } from './types';

const oauth2Context = (): AuthenticationService => {
  const { authService } = useAuth();

  const login = () => {
    authService.login();
  };

  const logout = () => {
    authService.logout(true);
  };

  const isAuthenticated = () => authService.isAuthenticated();

  const isPending = () => authService.isPending();

  const getClaim = <T,>(claimName: string): Result<Error, T | undefined> => {
    if (!isAuthenticated())
      return err(new Error('user is not authenticated'), undefined);
    const claims = authService.getUser() as any;
    const claim = claims[claimName] as T;
    if (claim) {
      return ok<Error, T>(claim);
    }
    return err(new Error('claim was not found'), undefined);
  };

  const getAccessToken = () => authService.getAuthTokens().access_token;

  return {
    login,
    logout,
    isPending,
    isAuthenticated,
    getClaim,
    getAccessToken,
  };
};

const OAuth2Provider = ({ children }: { children: ReactNode }) => {
  const authService = new AuthService({
    clientId: process.env.CLIENT_ID || '',
    location: window.location,
    provider: process.env.PROVIDER || '',
    redirectUri: `${window.location.origin}/callback`,
    scopes: [
      'openid',
      'profile',
      // 'aws.cognito.signin.user.admin',
      //'aus-ddr-events-api/user:read',
    ],
    audience: process.env.AUDIENCE,
    autoRefresh: true,
  });

  return (
    <AuthProvider authService={authService}>
      <AuthenticationProvider context={oauth2Context}>
        {children}
      </AuthenticationProvider>
    </AuthProvider>
  );
};

export default OAuth2Provider;
