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
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import ImageUploadFormField from 'components/image-upload-form-field';
import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from 'context/authentication';
import {
  Dancer,
  DancersRepositoryContext,
  DefaultDancer,
} from 'context/dancer';
import { Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { defaultPixel } from 'types/styled';
import { StateOptions } from 'utils/dropdown-options';
import { useLocation } from 'wouter';

interface RegistrationFormData extends Dancer {
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
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');

  useEffect(
    () => () => {
      URL.revokeObjectURL(profilePictureUrl);
    },
    [],
  );

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
            .create({
              ...DefaultDancer,
              ddrName: values.ddrName,
              ddrCode: values.ddrCode,
              state: values.state,
              primaryMachine: values.primaryMachine,
              newProfilePicture: values.newProfilePicture,
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

  const validateForm = (values: RegistrationFormData) => {
    const errors: FormikErrors<RegistrationFormData> = {};

    if (!values.ddrName) errors.ddrName = 'Please enter a dancer name';

    if (!/^\d+$/.test(values.ddrCode))
      errors.ddrCode = 'Please enter a valid dancer code';

    if (!values.email) errors.email = 'Please enter your email address';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = 'Please enter a valid email address';

    if (!values.password) errors.password = 'Please enter a password';
    else if (values.password !== values.confirmPassword)
      errors.confirmPassword = 'Passwords must match';

    return errors;
  };

  return (
    <Container maxW="sm" mb={defaultPixel}>
      <Heading mb={4}>Register</Heading>
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
          ...DefaultDancer,
          email: '',
          password: '',
          confirmPassword: '',
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
                  isRequired
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
                  isRequired
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
                  isRequired
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

            <Field type="ddrName" name="ddrName">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl id="ddrName" isRequired mb={4}>
                  <FormLabel>Dancer name</FormLabel>
                  <Input type="text" {...field} />
                  <FormErrorMessage>{form.errors.ddrName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field type="text" name="ddrCode">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  htmlFor="ddrCode"
                  isInvalid={form.errors.dancerId && form.touched.dancerId}
                  mb={4}
                >
                  <FormLabel>Dancer code</FormLabel>
                  <Input {...field} id="ddrCode" />
                  <FormErrorMessage>{form.errors.dancerId}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="state">
              {({ field }: { field: any }) => (
                <FormControl htmlFor="state" mb={4}>
                  <FormLabel>State of residence</FormLabel>
                  <Select
                    {...field}
                    id="state"
                    placeholder="Prefer not to disclose"
                  >
                    {StateOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.value}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Field>

            <Field type="text" name="primaryMachine">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl htmlFor="primaryMachine" mb={4}>
                  <FormLabel>Primary machine</FormLabel>
                  <Input {...field} id="primaryMachine" />
                  <FormErrorMessage>
                    {form.errors.primaryMachine}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field type="file" name="newProfilePicture">
              {({ form }: { form: any }) => (
                <ImageUploadFormField
                  pt={2}
                  h={defaultPixel * 1.5}
                  fieldName="newProfilePicture"
                  label="Profile picture"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      // eslint-disable-next-line react/prop-types
                      props.setFieldValue(
                        'newProfilePicture',
                        event.currentTarget.files[0],
                      );
                      setProfilePictureUrl(
                        URL.createObjectURL(event.currentTarget.files[0]),
                      );
                    }
                  }}
                  isInvalid={form.errors.new}
                  imageUrl={profilePictureUrl}
                  formError={form.errors.newProfilePicture}
                  imagePosition="bottom"
                />
              )}
            </Field>

            <Button
              colorScheme="blue"
              type="submit"
              // eslint-disable-next-line react/prop-types
              isLoading={props.isSubmitting}
              mr={4}
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
