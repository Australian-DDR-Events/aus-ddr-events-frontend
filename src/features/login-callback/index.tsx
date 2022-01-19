import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const LoginCallback = () => {
  window.localStorage.setItem('preAuthUri', '/profile/start');

  return (
    <Center>
      <Spinner // todo: replace this with proper skeleton structure
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
}

export default LoginCallback;