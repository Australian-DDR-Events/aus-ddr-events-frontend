/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Stack,
  useToast,
} from '@chakra-ui/react';
import AdminWrapper from 'components/admin-wrapper';
import ImageUploadFormField from 'components/image-upload-form-field';
import { AdminRepositoryContext } from 'context/admin';
import { Field, Form, Formik, FormikProps, FormikState } from 'formik';
import React, { useContext, useState } from 'react';

interface ImageUploadSubmissionFormData {
  image: File;
  name: string;
}

const ImageUploader = () => {
  const adminRepo = useContext(AdminRepositoryContext);
  const toast = useToast();

  const [imageUrl, setImageUrl] = useState('');
  const [sizes, setSizes] = useState(new Array<number>());
  const onSubmit = (values: ImageUploadSubmissionFormData) => {
    adminRepo.adminRepositoryInstance
      .uploadImage(values.image, values.name, sizes)
      .then(() => {
        toast({
          title: 'Image uploaded.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const validateForm = () => {};

  const initialValues: ImageUploadSubmissionFormData = {
    name: '',
    image: {
      name: '',
      lastModified: 0,
      size: 0,
      type: '',
      arrayBuffer: async () => new ArrayBuffer(0),
      slice: () => new Blob(),
      stream: () => new ReadableStream(),
      text: async () => '',
    },
  };

  return (
    <AdminWrapper>
      <Container maxW="80%" p={8}>
        <Heading textAlign="center" mb={4}>
          Image upload
        </Heading>
        <Box mb={2}>
          <FormLabel>Select image sizes to upload</FormLabel>
          <Stack direction={['column', 'row']} mb={2} justify="stretch">
            {[32, 64, 128, 256, 512].map((size) => (
              <Box w="fit-content" key={size} mr={8}>
                <Checkbox
                  checked={sizes.some((s) => s === size)}
                  onChange={(event) =>
                    event.target.checked
                      ? sizes.push(size)
                      : setSizes(sizes.filter((s) => s !== size))
                  }
                >
                  {size}px
                </Checkbox>
                <Spacer />
              </Box>
            ))}
          </Stack>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validateForm}
          >
            {(props: FormikProps<ImageUploadSubmissionFormData>) => (
              <Form>
                <Field name="name" type="text">
                  {({
                    field,
                    form,
                  }: {
                    field: string;
                    form: FormikState<ImageUploadSubmissionFormData>;
                  }) => (
                    <FormControl
                      htmlFor="name"
                      mb={4}
                      isInvalid={Boolean(form.errors.name && form.touched.name)}
                    >
                      <FormLabel>File name</FormLabel>
                      <Input id="name" {...field} type="text" />
                      <FormHelperText>
                        File name must be entire path excluding file extension.
                      </FormHelperText>
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field type="file" name="image">
                  {({
                    form,
                  }: {
                    form: FormikState<ImageUploadSubmissionFormData>;
                  }) => (
                    <ImageUploadFormField
                      label="Image"
                      fieldName="image"
                      isInvalid={Boolean(
                        form.errors.image && form.touched.image,
                      )}
                      imagePosition="top"
                      imageUrl={imageUrl}
                      formError={form.errors.image}
                      onChange={(event) => {
                        if (event.currentTarget.files) {
                          props.setFieldValue(
                            'image',
                            event.currentTarget.files[0],
                          );
                          setImageUrl(
                            URL.createObjectURL(event.currentTarget.files[0]),
                          );
                        }
                      }}
                    />
                  )}
                </Field>
                <Button colorScheme="blue" type="submit" mr={4} mb={4}>
                  Upload
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </AdminWrapper>
  );
};

export default ImageUploader;
