import React, { createContext, ReactNode, useContext, useState } from "react";
import { err, ok, Result } from 'types/result';

import AuthenticationProvider from './authenticationProvider';
import { AuthenticationService } from './types';
import { Flex, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";

const localContext = (): AuthenticationService => {
  const [pending, setPending] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { getUsername, getPassword } = useLocalAuth();

  const login = () => {
    console.log(getUsername());
    console.log(getAccessToken());
    setPending(true);
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      setLoggedIn(true);
      setPending(false);
    });
  };

  const logout = () => {
    setPending(true);
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      setLoggedIn(false);
      setPending(false);
    });
  };

  const isAuthenticated = () => loggedIn;

  const isPending = () => pending;

  const getClaim = <T,>(claimName: string): Result<Error, T | undefined> => {
    // if (!isAuthenticated())
    //   return err(new Error('user is not authenticated'), undefined);
    // const claims = authService.getUser() as any;
    // const claim = claims[claimName] as T;
    // if (claim) {
    //   return ok<Error, T>(claim);
    // }
    return err(new Error('claim was not found'), undefined);
  };
  const getAccessToken = () => Buffer.from(`${getUsername()}:${getPassword()}`).toString("base64");

  return {
    login,
    logout,
    isPending,
    isAuthenticated,
    getClaim,
    getAccessToken,
  };
};

interface LocalAuthSettings {
  getUsername: () => string;
  getPassword: () => string;
}

const LocalAuthContext = createContext<
  (() => LocalAuthSettings) | undefined
  >(undefined);

const useLocalAuth = (): LocalAuthSettings => {
  const auth = useContext(LocalAuthContext);
  if (auth === undefined)
    throw new Error('useAuthentication must be initialised');
  return auth();
};

const LocalProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const localAuthSettings: LocalAuthSettings = {
    getUsername: () => username,
    getPassword: () => password,
  }

  return (
      <LocalAuthContext.Provider value={() => localAuthSettings}>
        <AuthenticationProvider context={localContext}>
          <Flex
            as="nav"
            bg="teal"
            role="contentinfo"
            mx="auto"
            maxW="7xl"
            py="12"
            px={{ base: '4', md: '8' }}
          >
            <Stack
              direction={{ base: 'column-reverse', md: 'row' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>
                Local Authentication Mode
              </Text>
            </Stack>
            <Stack
              direction={{ base: 'column-reverse', md: 'row' }}
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControl id="username" mb={4}>
                <FormLabel>Username</FormLabel>
                <Input type="text" onChange={e => setUsername(e.target.value)} />
              </FormControl>
              <FormControl id="password" mb={4}>
                <FormLabel>Password</FormLabel>
                <Input type="text" onChange={e => setPassword(e.target.value)} />
              </FormControl>
            </Stack>
          </Flex>
          {children}
        </AuthenticationProvider>
      </LocalAuthContext.Provider>
  );
};

export default LocalProvider;
