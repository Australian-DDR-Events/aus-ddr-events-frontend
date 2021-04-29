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
import { Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import {
  AddDancerInput,
  useAddNewDancerMutation,
} from 'types/graphql.generated';
import { defaultPixel } from 'types/styled';
import { StateOptions } from 'utils/dropdown-options';
import { useLocation } from 'wouter';

interface RegistrationFormData extends AddDancerInput {
  email: string;
  password: string;
  confirmPassword: string;
}

const registrationFormValidator = (values: RegistrationFormData) => {
  const errors: FormikErrors<RegistrationFormData> = {};

  if (!values.ddrName) errors.ddrName = 'Please enter a dancer name';

  if (!values.email) errors.email = 'Please enter your email address';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = 'Please enter a valid email address';

  if (!values.password) errors.password = 'Please enter a password';
  else if (values.password !== values.confirmPassword)
    errors.confirmPassword = 'Passwords must match';

  return errors;
};

const RegistrationForm = () => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );

  const [authToken, setAuthToken] = useState('');
  const [signupLoading, setSignupLoading] = useState(true);

  authRepo.authenticationRepositoryInstance.onAuthStateChanged(
    async (result) => {
      setAuthToken(result.token || '');
      setSignupLoading(false);
    },
  );

  const [newDancerResult, addNewDancer] = useAddNewDancerMutation();
  const [dancerInput, setDancerInput] = useState<AddDancerInput | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!signupLoading) {
      addNewDancer(
        {
          input: {
            ...dancerInput!,
          },
        },
        {
          fetchOptions: {
            headers: {
              authorization: authToken ? `Bearer ${authToken}` : '',
            },
          },
        },
      );
    }
  }, [signupLoading]);

  const [, setLocation] = useLocation();
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');

  useEffect(() => {
    URL.revokeObjectURL(profilePictureUrl);
    const loggedInUser = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();
    if (loggedInUser.id) setLocation('/profile');
  }, []);

  useEffect(() => {
    if (!newDancerResult) return;
    const { data, error, fetching } = newDancerResult;
    if (fetching || (!data && !error)) return;
    if (data) {
      setLocation('/profile');
    }
    if (error) {
      setApiErrorMessage(error.message);
    }
  }, [newDancerResult]);

  const onSubmit = (
    values: RegistrationFormData,
    action: FormikHelpers<RegistrationFormData>,
  ) => {
    authRepo.authenticationRepositoryInstance
      .register(values.email, values.password)
      .then((authResult) => {
        if (authResult.isOk()) {
          setDancerInput({
            ddrName: values.ddrName,
            ddrCode: values.ddrCode,
            state: values.state,
            primaryMachineLocation: values.primaryMachineLocation,
            profilePicture: values.profilePicture,
          });
        } else {
          setApiErrorMessage(authResult.error.message);
        }
        action.setSubmitting(false);
      });
  };

  return (
    <Container maxW="sm" mb={8}>
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
          email: '',
          password: '',
          confirmPassword: '',
          ddrName: '',
          ddrCode: '',
          profilePicture: undefined,
          state: '',
          primaryMachineLocation: '',
        }}
        onSubmit={onSubmit}
        validate={registrationFormValidator}
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
              {({ field }: { field: any }) => (
                <FormControl htmlFor="ddrCode" mb={4}>
                  <FormLabel>Dancer code</FormLabel>
                  <Input {...field} id="ddrCode" />
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

            <Field type="text" name="primaryMachineLocation">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl htmlFor="primaryMachineLocation" mb={4}>
                  <FormLabel>Primary machine</FormLabel>
                  <Input {...field} id="primaryMachineLocation" />
                  <FormErrorMessage>
                    {form.errors.primaryMachineLocation}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field type="file" name="profilePicture">
              {({ form }: { form: any }) => (
                <ImageUploadFormField
                  pt={2}
                  h={defaultPixel * 1.5}
                  fieldName="profilePicture"
                  label="Profile picture"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      // eslint-disable-next-line react/prop-types
                      props.setFieldValue(
                        'profilePicture',
                        event.currentTarget.files[0],
                      );
                      setProfilePictureUrl(
                        URL.createObjectURL(event.currentTarget.files[0]),
                      );
                    }
                  }}
                  isInvalid={form.errors.new}
                  imageUrl={profilePictureUrl}
                  formError={form.errors.profilePicture}
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
