import React, { useContext, useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Image,
  AlertDescription,
  AlertTitle,
  Box,
  Alert,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { defaultSpacing } from 'types/styled-components';
import {
  IngredientsRepositoryContext,
  ScoreSubmissionRequest,
} from 'context/ingredients';
import { Summer2021Score } from 'types/summer2021';

const IngredientSubmissionForm = ({
  ingredientId,
  onSuccessfulSubmit,
  onCancelSubmit,
}: {
  ingredientId: string;
  onSuccessfulSubmit: (result: Summer2021Score) => void;
  onCancelSubmit: () => void;
}) => {
  const ingredientsRepository = useContext(IngredientsRepositoryContext);

  const [scoreImageUrl, setScoreImageUrl] = useState<string>('');
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  useEffect(
    () => () => {
      URL.revokeObjectURL(scoreImageUrl);
    },
    [],
  );

  const onSubmit = (
    values: ScoreSubmissionRequest,
    actions: FormikHelpers<ScoreSubmissionRequest>,
  ) => {
    ingredientsRepository.ingredientsRepositoryInstance
      .postScoreSubmission(ingredientId, values)
      .then((result) => {
        if (result.isErr()) {
          setApiErrorMessage(result.error.message);
        }

        if (result.isOk()) {
          onSuccessfulSubmit(result.okOrDefault());
        }
        actions.setSubmitting(false);
      });
  };

  const initialValues: ScoreSubmissionRequest = {
    score: 0,
    scoreImage: {
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => (
        <Form>
          <ModalBody>
            {apiErrorMessage && (
              <Alert status="error" borderRadius="md" mb={defaultSpacing / 2}>
                <Box flex="1">
                  <AlertTitle mr={2}>Uh oh!</AlertTitle>
                  <AlertDescription>{apiErrorMessage}</AlertDescription>
                </Box>
              </Alert>
            )}
            <FormControl htmlFor="scoreImage" mb={defaultSpacing / 2}>
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
                id="scoreImage"
                multiple={false}
                accept="image/*"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    // eslint-disable-next-line react/prop-types
                    props.setFieldValue(
                      'scoreImage',
                      event.currentTarget.files[0],
                    );
                    setScoreImageUrl(
                      URL.createObjectURL(event.currentTarget.files[0]),
                    );
                  }
                }}
              />
            </FormControl>

            <Field type="number" name="score">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl htmlFor="score" mb={defaultSpacing / 2}>
                  <FormLabel>EX score</FormLabel>
                  <Input {...field} id="score" type="number" />
                  <FormErrorMessage>{form.errors.score}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </ModalBody>

          <ModalFooter>
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
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};

export default IngredientSubmissionForm;
