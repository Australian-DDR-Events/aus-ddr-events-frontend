import { useAuthentication } from "../../hooks/use-authentication";
import { Center, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation } from "wouter";

const Callback = () => {
  const { isPending, isAuthenticated } = useAuthentication();
  const [,setLocation] = useLocation();
  let attempts = 0;
  useEffect(() => {
    if (!isPending()) {
      setLocation("/");
    }
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => attempts++);
  }, [attempts]);
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

export default Callback;