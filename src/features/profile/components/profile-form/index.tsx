import React, { useContext, useEffect, useState } from 'react';
import { StateOptions } from 'features/profile/constants';
import { DancersRepositoryContext } from 'context/dancer';
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Button,
  Image,
  AlertDescription,
  AlertTitle,
  Box,
  Alert,
} from '@chakra-ui/react';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { defaultSpacing } from 'types/styled-components';
import { ProfileFormData } from './types';

const ProfileForm = ({
  formData,
  onSuccessfulSubmit,
  onCancelSubmit,
}: {
  formData: ProfileFormData;
  onSuccessfulSubmit: Function;
  onCancelSubmit: Function;
}) => {
  const dancersRepository = useContext(DancersRepositoryContext);

  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  useEffect(
    () => () => {
      if (profilePictureUrl) {
        URL.revokeObjectURL(profilePictureUrl);
      }
    },
    [profilePictureUrl],
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
        ...formData,
        ...values,
      })
      .then((result) => {
        if (result.isOk()) {
          onSuccessfulSubmit();
        } else if (result.isErr()) {
          setApiErrorMessage(result.error.message);
        }
        actions.setSubmitting(false);
      });
  };

  return (
    <Container>
      {apiErrorMessage && (
        <Alert status="error" borderRadius="md" mb={defaultSpacing / 2}>
          <Box flex="1">
            <AlertTitle mr={2}>Uh oh!</AlertTitle>
            <AlertDescription>{apiErrorMessage}</AlertDescription>
          </Box>
        </Alert>
      )}
      <Formik initialValues={formData} onSubmit={onSubmit}>
        {(props) => (
          <Form>
            <Field
              type="dancerName"
              name="dancerName"
              validate={validateDancerName}
            >
              {({ field, form }: { field: any; form: any }) => (
                <FormControl id="dancerName" isRequired mb={defaultSpacing / 2}>
                  <FormLabel>Dancer name</FormLabel>
                  <Input type="text" {...field} />
                  <FormErrorMessage>{form.errors.dancerName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field type="text" name="dancerId" validate={validateDancerId}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  htmlFor="dancerId"
                  isInvalid={form.errors.dancerId && form.touched.dancerId}
                  mb={defaultSpacing / 2}
                >
                  <FormLabel>Dancer code</FormLabel>
                  <Input {...field} id="dancerId" />
                  <FormErrorMessage>{form.errors.dancerId}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="state">
              {({ field }: { field: any }) => (
                <FormControl htmlFor="state" mb={defaultSpacing / 2}>
                  <FormLabel>State of residence</FormLabel>
                  <Select {...field} id="state">
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
