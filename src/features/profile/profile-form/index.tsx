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
import ImageUploadFormField from 'components/image-upload-form-field';
import { DancersRepositoryContext } from 'context/dancer';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { DancerFieldsFragment } from 'types/graphql.generated';
import { defaultPixel } from 'types/styled';
import { StateOptions } from 'utils/dropdown-options';

import { ProfileFormData } from './types';

const ProfileForm = ({
  formData,
  onSuccessfulSubmit,
  onCancelSubmit,
}: {
  formData: DancerFieldsFragment;
  onSuccessfulSubmit: () => void;
  onCancelSubmit: Function;
}) => {
  const dancersRepository = useContext(DancersRepositoryContext);

  const initialFormData: ProfileFormData = {
    id: formData.id,
    ddrName: formData.ddrName,
    ddrCode: formData.ddrCode,
    profilePictureUrl: formData.profilePictureUrl,
    state: formData.state,
    primaryMachine: formData.primaryMachineLocation,
    newProfilePicture: new File([''], 'filename'),
  };

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
          onSuccessfulSubmit();
        } else if (result.isErr()) {
          setApiErrorMessage(result.error.message);
          actions.setSubmitting(false);
        }
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
      <Formik initialValues={initialFormData} onSubmit={onSubmit}>
        {(props) => (
          <Form>
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
                  imagePosition="bottom"
                  formError={form.errors.newProfilePicture}
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
