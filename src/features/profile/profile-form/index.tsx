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
  Image,
  Input,
  Select,
} from '@chakra-ui/react';
import { Dancer, DancersRepositoryContext } from 'context/dancer';
import { StateOptions } from 'features/profile/constants';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { defaultSpacing } from 'types/styled';

import { ProfileFormData } from './types';

const ProfileForm = ({
  formData: initialFormData,
  onSuccessfulSubmit,
  onCancelSubmit,
}: {
  formData: ProfileFormData;
  onSuccessfulSubmit: (dancer: Dancer) => void;
  onCancelSubmit: Function;
}) => {
  const dancersRepository = useContext(DancersRepositoryContext);

  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  useEffect(
    () => () => {
      URL.revokeObjectURL(profilePictureUrl);
    },
    [],
  );

  const validateDancerName = (value: string) => {
    if (!value) return 'Please enter a dancer name';
    return null;
  };

  const validateDancerId = (value: string) => {
    if (!/^\d+$/.test(value)) return 'Please enter a valid dancer code';
    return null;
  };

  const onSubmit = (
    values: ProfileFormData,
    actions: FormikHelpers<ProfileFormData>,
  ) => {
    dancersRepository.dancersRepositoryInstance
      .update({
        ...initialFormData,
        ...values,
      })
      .then((result) => {
        if (result.isOk()) {
          onSuccessfulSubmit(values);
        } else if (result.isErr()) {
          setApiErrorMessage(result.error.message);
          actions.setSubmitting(false);
        }
      });
  };

  return (
    <Container mb={defaultSpacing}>
      {apiErrorMessage && (
        <Alert status="error" borderRadius="md" mb={defaultSpacing / 2}>
          <Box flex="1">
            <AlertTitle mr={2}>Uh oh!</AlertTitle>
            <AlertDescription>{apiErrorMessage}</AlertDescription>
          </Box>
        </Alert>
      )}
      <Formik initialValues={initialFormData} onSubmit={onSubmit}>
        {(props) => (
          <Form>
            <Field type="ddrName" name="ddrName" validate={validateDancerName}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl id="ddrName" isRequired mb={defaultSpacing / 2}>
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
                  isInvalid={form.errors.dancerId && form.touched.dancerId}
                  mb={defaultSpacing / 2}
                >
                  <FormLabel>Dancer code</FormLabel>
                  <Input {...field} id="ddrCode" />
                  <FormErrorMessage>{form.errors.dancerId}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="state">
              {({ field }: { field: any }) => (
                <FormControl htmlFor="state" mb={defaultSpacing / 2}>
                  <FormLabel>State of residence</FormLabel>
                  <Select {...field} id="state" placeholder="Select a state">
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
                <FormControl htmlFor="primaryMachine" mb={defaultSpacing / 2}>
                  <FormLabel>Primary machine</FormLabel>
                  <Input {...field} id="primaryMachine" />
                  <FormErrorMessage>
                    {form.errors.primaryMachine}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <FormControl htmlFor="newProfilePicture" mb={defaultSpacing / 2}>
              <FormLabel>Profile picture</FormLabel>
              <Input
                type="file"
                pt={defaultSpacing / 4}
                h={defaultSpacing * 1.5}
                id="newProfilePicture"
                multiple={false}
                accept="image/*"
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
              />
              {profilePictureUrl && (
                <Image
                  src={profilePictureUrl}
                  w={defaultSpacing * 16}
                  mt={defaultSpacing / 2}
                />
              )}
            </FormControl>

            <Button
              colorScheme="blue"
              type="submit"
              // eslint-disable-next-line react/prop-types
              isLoading={props.isSubmitting}
              mr={defaultSpacing / 2}
            >
              Save
            </Button>
            <Button
              colorScheme="gray"
              // eslint-disable-next-line react/prop-types
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
