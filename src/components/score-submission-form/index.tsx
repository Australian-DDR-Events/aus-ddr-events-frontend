import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
} from '@chakra-ui/react';
import { FormikErrors } from 'formik';
import React from 'react';
import { defaultSpacing } from 'types/styled-components';

const ScoreSubmissionForm = ({
  fieldName,
  onChange,
  isInvalid,
  scoreImageUrl,
  formError,
}: {
  fieldName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  scoreImageUrl: string;
  formError?: FormikErrors<File>;
}) => {
  return (
    <FormControl
      htmlFor={fieldName}
      mb={defaultSpacing / 2}
      isInvalid={isInvalid}
    >
      {scoreImageUrl && (
        <Image
          src={scoreImageUrl}
          w={defaultSpacing * 16}
          mb={defaultSpacing / 2}
        />
      )}
      <FormLabel>Profile picture</FormLabel>
      <Input
        type="file"
        pt={defaultSpacing / 4}
        h={defaultSpacing * 1.5}
        id={fieldName}
        multiple={false}
        accept="image/*"
        onChange={onChange}
      />
      <FormErrorMessage>{formError}</FormErrorMessage>
    </FormControl>
  );
};

export default ScoreSubmissionForm;
