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
import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik';
import useAuthentication from 'hooks/use-authentication';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

interface ResetPasswordFormData {
  email: string;
}

const EmailForm = ({ onSubmitCallback }: { onSubmitCallback: Function }) => {
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [, setLocation] = useLocation();
  const { sendPasswordResetEmail } = useAuthentication();
  const onSubmit = (
    values: ResetPasswordFormData,
    action: FormikHelpers<ResetPasswordFormData>,
  ) => {
    sendPasswordResetEmail(values.email).then((result) => {
      if (result.isOk()) onSubmitCallback();
      else {
        setApiErrorMessage(result.error.message);
        action.setSubmitting(false);
      }
    });
  };

  const validateForm = (values: FormikValues) => {
    interface ValidationErrors {
      email?: any;
    }
    const errors: ValidationErrors = {};
    if (!values.email) errors.email = 'Please enter your email address';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = 'Please enter a valid email address';
    return errors;
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
        validate={validateForm}
      >
        {(props) => (
          <Form>
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
            <Button
              colorScheme="blue"
              type="submit"
              // eslint-disable-next-line react/prop-types
              isLoading={props.isSubmitting}
              mr={4}
            >
              Reset Password
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              // eslint-disable-next-line react/prop-types
              isLoading={props.isSubmitting}
              onClick={() => setLocation('/login')}
            >
              Return to Login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EmailForm;
