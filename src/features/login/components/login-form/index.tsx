import React, { useContext, useEffect } from 'react';
import { useLocation } from 'wouter';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from 'context/authentication';
import {
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

const LoginForm = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [, setLocation] = useLocation();
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
        }
      });
  };

  return (
    <Container maxW="sm">
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
          {errors.password && (
            <FormErrorMessage>Invalid password</FormErrorMessage>
          )}
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
