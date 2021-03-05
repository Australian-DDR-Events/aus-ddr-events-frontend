import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from 'context/authentication';
import {
  Alert,
  AlertDescription,
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
import { defaultSpacing } from 'types/styled-components';
import { Formik, FormikHelpers, Form, Field } from 'formik';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [, setLocation] = useLocation();
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  useEffect(() => {
    const loggedInUser = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();
    if (loggedInUser.id) {
      setLocation('/');
    }
  }, []);

  const onSubmit = (
    values: LoginFormData,
    actions: FormikHelpers<LoginFormData>,
  ) => {
    authRepo.authenticationRepositoryInstance
      ?.login(values.email, values.password, values.remember)
      .then((result) => {
        if (result.isOk()) {
          setLocation('/');
        } else {
          setApiErrorMessage(result.error.message);
        }

        actions.setSubmitting(false);
      });
  };

  const validateEmail = (email: string) => {
    if (!email) return 'Please enter your email address';

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      return 'Please enter a valid email address';

    return null;
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Please enter a password';

    return null;
  };

  return (
    <Container maxW="sm">
      {apiErrorMessage && (
        <Alert status="error" borderRadius="md" mb={defaultSpacing / 2}>
          <Box flex="1">
            <AlertTitle mr={2}>Uh oh!</AlertTitle>
            <AlertDescription>{apiErrorMessage}</AlertDescription>
          </Box>
        </Alert>
      )}
      <Formik
        initialValues={{
          email: '',
          password: '',
          remember: false,
        }}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <Field type="email" name="email" validate={validateEmail}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  htmlFor="email"
                  isInvalid={form.errors.email && form.touched.email}
                  mb={4}
                >
                  <FormLabel>Email address</FormLabel>
                  <Input {...field} id="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field type="password" name="password" validate={validatePassword}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  htmlFor="password"
                  isInvalid={form.errors.password && form.touched.password}
                  mb={4}
                >
                  <FormLabel>Password</FormLabel>
                  <Input {...field} id="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Flex justify={['space-between']} mb={4}>
              <Field name="remember">
                {({ field }: { field: any }) => (
                  <FormControl htmlFor="remember">
                    <Checkbox name="remember" id="remember" {...field}>
                      Remember me
                    </Checkbox>
                  </FormControl>
                )}
              </Field>

              <Button variant="link" size="sm" mr={defaultSpacing / 2}>
                Forgot password?
              </Button>
            </Flex>
            <Button
              colorScheme="blue"
              type="submit"
              // eslint-disable-next-line react/prop-types
              isLoading={props.isSubmitting}
              mr={defaultSpacing / 2}
            >
              Login
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              // eslint-disable-next-line react/prop-types
              isLoading={props.isSubmitting}
              onClick={() => setLocation('/register')}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
