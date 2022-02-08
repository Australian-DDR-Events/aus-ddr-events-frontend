import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { AxiosRequestConfig } from 'axios';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useLocation } from 'wouter';

import { StateOptions } from '../../../../utils/dropdown-options';
import { PostCurrentUser } from './service';
import { CreateProfileFormData } from './types';

const CreateProfileForm: React.FC = () => {
  const [, setlocation] = useLocation();

  const { execute } = PostCurrentUser();

  const validateDancerName = (value: string) => {
    if (!value) return 'Please enter a dancer name';
    return null;
  };

  const validateDancerId = (value: string) => {
    if (!/^\d+$/.test(value)) return 'Please enter a valid dancer code';
    return null;
  };

  const onSubmit = (
    values: CreateProfileFormData,
    actions: FormikHelpers<CreateProfileFormData>,
  ) => {
    const requestOptions: AxiosRequestConfig = {
      url: '/dancers',
      method: 'POST',
      data: values,
    };
    execute(requestOptions)
      .then(() => {
        setlocation('/profile');
      })
      .catch(() => {
        actions.setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{
        ddrName: '',
        ddrCode: '',
        state: '',
        primaryLocation: '',
      }}
      onSubmit={onSubmit}
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
          <Field type="ddrCode" name="ddrCode" validate={validateDancerId}>
            {({ field, form }: { field: any; form: any }) => (
              <FormControl id="ddrName" isRequired mb={4}>
                <FormLabel>DDR Code</FormLabel>
                <Input type="text" {...field} />
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
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={props.isSubmitting}
            mr={4}
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProfileForm;
