import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from 'context/authentication';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { defaultSpacing } from '~/types/styled-components';

const LoginForm = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [, setLocation] = useLocation();
  const [apiErrors, setApiErrors] = useState('');
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    const loggedInUser = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();
    if (loggedInUser.id) {
      setLocation('/');
    }
  }, []);

  const onFinish = (values: any) => {
    authRepo.authenticationRepositoryInstance
      ?.login(values.email, values.password, values.remember)
      .then((result) => {
        if (result.isOk()) {
          setLocation('/');
        } else {
          console.log(result);
          setApiErrors(result.error.message);
        }
      });
  };

  return (
    <Container maxW="sm">
      {apiErrors && (
        <Alert status="error" borderRadius="md" mb={defaultSpacing / 2}>
          <Box flex="1">
            <AlertTitle mr={2}>Uh oh!</AlertTitle>
            <AlertDescription>{apiErrors}</AlertDescription>
          </Box>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onFinish)}>
        <FormControl id="email" mb={4}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" name="email" ref={register({ required: true })} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            ref={register({ required: true })}
          />
        </FormControl>
        <Flex justify={['space-between']} mb={4}>
          <Checkbox name="remember" ref={register}>
            Remember me
          </Checkbox>
          <Button variant="link" size="sm" p={0}>
            Forgot password?
          </Button>
        </Flex>
        <Button colorScheme="blue" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
