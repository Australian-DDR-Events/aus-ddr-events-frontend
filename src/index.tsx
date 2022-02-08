import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import axios from 'axios';
import Router from 'components/router';
import Wrapper from 'components/wrapper';
import dotenv from 'dotenv';
import { OAuth2Provider, useAuthentication } from 'hooks/use-authentication';
import { EndpointProvider, useEndpoint } from 'hooks/use-endpoint';
import React from 'react';
import ReactDOM from 'react-dom';
import { HeadProvider, Title } from 'react-head';
import compose, { ComposeProps } from 'utils/compose';

import LocalProvider from './hooks/use-authentication/LocalProvider';
import theme from './theme';

dotenv.config();

const App = (): React.ReactElement => {
  const { url } = useEndpoint();
  const { isAuthenticated, getAccessToken } = useAuthentication();
  axios.interceptors.request.use((config) => {
    config.baseURL = url;
    if (isAuthenticated()) {
      config.headers = {
        authorization: `bearer ${getAccessToken()}`,
      };
    }
    return config;
  });

  return (
    <Wrapper>
      <Router />
    </Wrapper>
  );
  // return (
  //   <Wrapper>
  //     {isPending() ? (
  //       <Center>
  //         <Spinner // todo: replace this with proper skeleton structure
  //           thickness="4px"
  //           speed="0.65s"
  //           emptyColor="gray.200"
  //           color="blue.500"
  //           size="xl"
  //         />
  //       </Center>
  //     ) : (
  //       <Router />
  //     )}
  //   </Wrapper>
  // );
};

const authProvider =
  process.env.AUTH_PROVIDER === 'local' ? LocalProvider : OAuth2Provider;

const providers: Array<ComposeProps> = [
  {
    Provider: authProvider,
  },
  {
    Provider: HeadProvider,
  },
  {
    Provider: ChakraProvider,
  },
  {
    Provider: EndpointProvider,
    props: { baseUrl: process.env.API_BASE },
  },
];

ReactDOM.render(
  compose(
    providers,
    <>
      <Title>Australian DDR Events</Title>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </>,
  ),
  document.getElementById('root'),
);
