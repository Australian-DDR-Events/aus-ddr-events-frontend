import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
} from '@chakra-ui/react';
import { FormikErrors } from 'formik';
import React from 'react';
import { defaultPixel } from 'types/styled';

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
    <FormControl htmlFor={fieldName} mb={4} isInvalid={isInvalid}>
      {imageUrl && imagePosition === 'top' && (
        <Image src={imageUrl} w={defaultPixel * 16} mb={4} />
      )}

      <FormLabel>{label}</FormLabel>
      <Input
        type="file"
        pt={2}
        h={defaultPixel * 1.5}
        id={fieldName}
        multiple={false}
        accept="image/*"
        onChange={onChange}
        {...rest}
      />
      <FormErrorMessage>{formError}</FormErrorMessage>

      {imageUrl && imagePosition === 'bottom' && (
        <Image src={imageUrl} w={defaultPixel * 16} mt={4} />
      )}
    </FormControl>
  );
};

export default ImageUploadFormField;
