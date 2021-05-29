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
import { Field, Form, Formik, FormikHelpers } from 'formik';
import useAuthentication from 'hooks/use-authentication';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const [, setLocation] = useLocation();
  const { loggedInUser } = useAuthentication();
  if (loggedInUser) setLocation('/');

  const { login } = useAuthentication();
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  const onSubmit = (
    values: LoginFormData,
    actions: FormikHelpers<LoginFormData>,
  ) => {
    login(values.email, values.password, values.remember).then((result) => {
      if (result.isOk()) {
        setLocation('/');
      } else {
        setApiErrorMessage(result.error.message);
        actions.setSubmitting(false);
      }
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
        <Alert status="error" borderRadius="md" mb={4}>
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
                  <Input id="password" type="password" {...field} />
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

              <Button
                variant="link"
                size="sm"
                mr={4}
                onClick={() => {
                  setLocation('/forgot-password');
                }}
              >
                Forgot password?
              </Button>
            </Flex>
            <Button
              colorScheme="blue"
              type="submit"
              // eslint-disable-next-line react/prop-types
              isLoading={props.isSubmitting}
              mr={4}
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

export default Login;
