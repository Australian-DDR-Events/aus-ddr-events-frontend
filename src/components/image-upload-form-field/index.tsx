import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
} from '@chakra-ui/react';
import { FormikErrors } from 'formik';
import React from 'react';
import { defaultSpacing } from 'types/styled';

const ImageUploadFormField = ({
  fieldName,
  label,
  onChange,
  isInvalid,
  imageUrl,
  formError,
  imagePosition,
  ...rest
}: {
  fieldName: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  imageUrl: string;
  imagePosition: string;
  formError?: FormikErrors<File>;
  [x: string]: any;
}) => {
  return (
    <FormControl
      htmlFor={fieldName}
      mb={defaultSpacing / 2}
      isInvalid={isInvalid}
    >
      {imageUrl && imagePosition === 'top' && (
        <Image src={imageUrl} w={defaultSpacing * 16} mb={defaultSpacing / 2} />
      )}

      <FormLabel>{label}</FormLabel>
      <Input
        type="file"
        pt={defaultSpacing / 4}
        h={defaultSpacing * 1.5}
        id={fieldName}
        multiple={false}
        accept="image/*"
        onChange={onChange}
        {...rest}
      />
      <FormErrorMessage>{formError}</FormErrorMessage>

      {imageUrl && imagePosition === 'bottom' && (
        <Image src={imageUrl} w={defaultSpacing * 16} mt={defaultSpacing / 2} />
      )}
    </FormControl>
  );
};

export default ImageUploadFormField;
