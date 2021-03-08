import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from 'context/authentication';
import { DancersRepositoryContext, DefaultDancer } from 'context/dancer';
import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { defaultSpacing } from 'types/styled';
import { useLocation } from 'wouter';

interface RegistrationFormData {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const dancersRepository = useContext(DancersRepositoryContext);
  const [, setLocation] = useLocation();
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  useEffect(() => {
    const loggedInUser = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();
    if (loggedInUser.id) setLocation('/profile');
  });

  const onSubmit = (
    values: RegistrationFormData,
    action: FormikHelpers<RegistrationFormData>,
  ) => {
    authRepo.authenticationRepositoryInstance
      .register(values.email, values.password)
      .then((authResult) => {
        if (authResult.isOk()) {
          dancersRepository.dancersRepositoryInstance
            .update({
              ...DefaultDancer,
              userName: values.displayName,
            })
            .then((dancerResult) => {
              if (dancerResult.isOk()) {
                setLocation('/profile');
              } else {
                setApiErrorMessage(dancerResult.error.message);
              }
            });
        } else {
          setApiErrorMessage(authResult.error.message);
        }
        action.setSubmitting(false);
      });
  };

  const validateForm = (values: FormikValues) => {
    interface ValidationErrors {
      displayName?: any;
      email?: any;
      password?: any;
      confirmPassword?: any;
    }
    const errors: ValidationErrors = {};
    if (!values.displayName) errors.displayName = 'Please enter a display name';
    if (!values.email) errors.email = 'Please enter your email address';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = 'Please enter a valid email address';
    if (!values.password) errors.password = 'Please enter a password';
    else if (values.password !== values.confirmPassword)
      errors.confirmPassword = 'Passwords must match';
    return errors;
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
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={onSubmit}
        validate={validateForm}
      >
        {(props) => (
          <Form>
            <Field type="text" name="displayName">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  htmlFor="displayName"
                  isInvalid={
                    form.errors.displayName && form.touched.displayName
                  }
                  mb={4}
                >
                  <FormLabel>Display Name</FormLabel>
                  <Input {...field} id="displayName" />
                  <FormErrorMessage>{form.errors.displayName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field type="email" name="email">
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

            <Field type="password" name="password">
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

            <Field type="password" name="confirmPassword">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  htmlFor="confirmPassword"
                  isInvalid={
                    form.errors.confirmPassword && form.touched.confirmPassword
                  }
                  mb={4}
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Input id="confirmPassword" type="password" {...field} />
                  <FormErrorMessage>
                    {form.errors.confirmPassword}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              colorScheme="blue"
              type="submit"
              // eslint-disable-next-line react/prop-types
              isLoading={props.isSubmitting}
              mr={defaultSpacing / 2}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RegistrationForm;
