import {
  Center,
  ChakraProvider,
  ColorModeScript,
  Spinner,
} from '@chakra-ui/react';
import Router from 'components/router';
import Wrapper from 'components/wrapper';
import dotenv from 'dotenv';
import { OAuth2Provider, useAuthentication } from 'hooks/use-authentication';
import { EndpointProvider } from 'hooks/use-endpoint';
import React from 'react';
import ReactDOM from 'react-dom';
import { HeadProvider, Title } from 'react-head';
import compose, { ComposeProps } from 'utils/compose';

import theme from './theme';
import LocalProvider from "./hooks/use-authentication/LocalProvider";

dotenv.config();

const App = (): React.ReactElement => {
  const { isPending } = useAuthentication();
  return <Wrapper><Router /></Wrapper>;
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

const authProvider = process.env.AUTH_PROVIDER === "local" ? LocalProvider : OAuth2Provider;

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
