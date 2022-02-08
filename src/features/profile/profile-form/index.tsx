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
  Select,
} from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { StateOptions } from 'utils/dropdown-options';

import { PutCurrentUser } from './service';
import { ProfileFormData, UpdateProfileData } from './types';

const ProfileForm = ({
  formData,
  onSuccessfulSubmit,
  onCancelSubmit,
}: {
  formData: ProfileFormData;
  onSuccessfulSubmit: () => void;
  onCancelSubmit: Function;
}) => {
  const initialFormData: UpdateProfileData = {
    ddrName: formData.name,
    ddrCode: formData.code,
    state: formData.state,
    primaryMachineLocation: formData.primaryLocation,
  };

  const { execute } = PutCurrentUser();
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');

  const validateDancerName = (value: string) => {
    if (!value) return 'Please enter a dancer name';
    return null;
  };

  const validateDancerId = (value: string) => {
    if (!/^\d+$/.test(value)) return 'Please enter a valid dancer code';
    return null;
  };

  const onSubmit = (
    values: UpdateProfileData,
    actions: FormikHelpers<UpdateProfileData>,
  ) => {
    const requestOptions: AxiosRequestConfig = {
      url: '/dancers',
      method: 'PUT',
      data: values,
    };
    execute(requestOptions)
      .then(() => {
        actions.setSubmitting(false);
        onSuccessfulSubmit();
      })
      .catch(() => {
        setApiErrorMessage('Failed to update profile.');
        actions.setSubmitting(false);
      });
  };

  return (
    <Container mb={8}>
      {apiErrorMessage && (
        <Alert status="error" borderRadius="md" mb={4}>
          <Box flex="1">
            <AlertTitle mr={2}>Uh oh!</AlertTitle>
            <AlertDescription>{apiErrorMessage}</AlertDescription>
          </Box>
        </Alert>
      )}
      <Formik
        initialValues={initialFormData}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Field type="ddrName" name="ddrName" validate={validateDancerName}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl id="ddrName" isRequired mb={4}>
                  <FormLabel>Dancer name</FormLabel>
                  <Input type="text" {...field} />
                  <FormErrorMessage>{form.errors.ddrName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field type="text" name="ddrCode" validate={validateDancerId}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  htmlFor="ddrCode"
                  isInvalid={form.errors.ddrCode && form.touched.ddrCode}
                  mb={4}
                >
                  <FormLabel>Dancer code</FormLabel>
                  <Input {...field} id="ddrCode" />
                  <FormErrorMessage>{form.errors.ddrCode}</FormErrorMessage>
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

            {/* <Field type="file" name="profilePicture">
              {({ form }: { form: any }) => (
                <ImageUploadFormField
                  pt={2}
                  h={defaultPixel * 1.5}
                  fieldName="profilePicture"
                  label="Profile picture"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
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
                  imagePosition="bottom"
                  formError={form.errors.profilePicture}
                />
              )}
            </Field> */}

            <Button
              colorScheme="blue"
              type="submit"
              isLoading={props.isSubmitting}
              mr={4}
            >
              Save
            </Button>
            <Button
              colorScheme="gray"
              isLoading={props.isSubmitting}
              onClick={() => onCancelSubmit()}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ProfileForm;
