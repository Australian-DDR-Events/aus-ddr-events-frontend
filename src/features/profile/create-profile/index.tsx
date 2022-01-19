import { Center, Container, Heading, Spinner, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation } from "wouter";
import CreateProfileForm from "./create-profile-form";
import { DancerResponse } from "./types";
import useApi from "../../../hooks/use-api";
import { AxiosRequestConfig } from "axios";

const CreateProfile: React.FC = () => {
  const [isLargerThan767] = useMediaQuery('(min-width: 767px)');

  const requestOptions: AxiosRequestConfig = {
    url: '/dancers/me',
    method: 'GET',
  };
  const { error, loading } = useApi<DancerResponse>(requestOptions);

  const [,setLocation] = useLocation();

  useEffect(() => {
    if (!loading && error == null) {
      setLocation("/profile");
    }
  }, [loading]);

  if (loading) {
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

  return (
    <Container maxW={isLargerThan767 ? '90%' : '100%'} w="fit-content">
      <Heading size="lg">Let&apos;s get you setup.</Heading>
      <CreateProfileForm />
    </Container>
  );
}

export default CreateProfile;