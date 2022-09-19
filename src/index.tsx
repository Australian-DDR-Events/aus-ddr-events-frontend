import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import axios from 'axios';
import Router from 'components/router';
import Wrapper from 'components/wrapper';
import dotenv from 'dotenv';
import { AuthChangedProvider } from 'hooks/use-auth-changed';
import { EndpointProvider, useEndpoint } from 'hooks/use-endpoint';
import React from 'react';
import ReactDOM from 'react-dom';
import { HeadProvider, Title } from 'react-head';
import compose, { ComposeProps } from 'utils/compose';

import theme from './theme';

dotenv.config();

const App = (): React.ReactElement => {
  const { url } = useEndpoint();
  axios.interceptors.request.use((config) => {
    config.baseURL = url;
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

const providers: Array<ComposeProps> = [
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
  {
    Provider: AuthChangedProvider,
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
