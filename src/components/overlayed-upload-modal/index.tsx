import {
  Button,
  Heading,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import ImageUploadFormField from 'components/image-upload-form-field';
import {
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
  FormikState,
} from 'formik';
import React, { useEffect, useState } from 'react';

import { PostImage } from './service';
import { ImageSubmissionData } from './types';

interface OverlayedUploadModalProps {
  uploadDestination: string;
  title: string;
  maxX: number;
  maxY: number;
  onClose: () => void;
}

const OverlayedUploadModal = ({
  uploadDestination,
  title,
  maxX,
  maxY,
  onClose,
}: OverlayedUploadModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(
    () => () => {
      URL.revokeObjectURL(imageUrl);
    },
    [],
  );

  const onFinish = () => {
    setIsOpen(false);
    onClose();
  };

  const onSubmit = (
    values: ImageSubmissionData,
    actions: FormikHelpers<ImageSubmissionData>,
  ) => {
    PostImage({
      data: values,
      maxX,
      maxY,
      url: uploadDestination,
    }).then(() => {
      actions.setSubmitting(false);
      onFinish();
    });
  };

  const initialFormData: ImageSubmissionData = {
    image: new File([new Blob()], 'image', undefined),
  };

  const validateForm = (
    data: ImageSubmissionData,
  ): FormikErrors<ImageSubmissionData> => {
    const errors: FormikErrors<ImageSubmissionData> = {};

    if (!data.image.type.startsWith('image/'))
      errors.image = 'Image must be an image file!';
    return errors;
  };

  const onModalClose = () => {
    setIsOpen(false);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent position="relative" padding="10px">
        <Heading display="flex" alignItems="center">
          {title}
        </Heading>
        <Formik
          initialValues={initialFormData}
          onSubmit={onSubmit}
          valiate={validateForm}
        >
          {(props: FormikProps<ImageSubmissionData>) => (
            <Form onSubmit={props.handleSubmit}>
              <Field type="file" name="image">
                {({ form }: { form: FormikState<ImageSubmissionData> }) => (
                  <ImageUploadFormField
                    label="Choose your image"
                    fieldName="image"
                    isInvalid={Boolean(form.errors.image && form.touched.image)}
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

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={props.isSubmitting}
                  mr={4}
                >
                  Submit
                </Button>
                <Button
                  colorScheme="gray"
                  isLoading={props.isSubmitting}
                  onClick={() => onFinish()}
                >
                  Close
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default OverlayedUploadModal;
