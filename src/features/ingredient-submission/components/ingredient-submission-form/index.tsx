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
  Progress,
} from '@chakra-ui/react';
import { Formik, FormikHelpers, Form, Field, FormikValues } from 'formik';
import { defaultSpacing } from 'types/styled-components';
import {
  IngredientsRepositoryContext,
  ScoreSubmissionRequest,
} from 'context/ingredients';
import { Summer2021Score } from 'types/summer2021';

const IngredientSubmissionForm = ({
  ingredientId,
  maxScore,
  onSuccessfulSubmit,
  onCancelSubmit,
}: {
  ingredientId: string;
  maxScore: number;
  onSuccessfulSubmit: (result: Summer2021Score) => void;
  onCancelSubmit: () => void;
}) => {
  const ingredientsRepository = useContext(IngredientsRepositoryContext);

  const [scoreImageUrl, setScoreImageUrl] = useState<string>('');
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [progressBarPercent, setProgressBarPercent] = useState(0);

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
      .postScoreSubmission(ingredientId, values, (progressEvent: any) => {
        setProgressBarPercent(
          Math.round(progressEvent.loaded * 100) / progressEvent.total,
        );
      })
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

  const validateForm = (values: FormikValues) => {
    interface ValidationErrors {
      score?: any;
      scoreImage?: any;
    }
    const errors: ValidationErrors = {};
    if (values.score < 0 || values.score > maxScore)
      errors.score = 'Score provided is too high!';
    if (!values.scoreImage.type.startsWith('image/'))
      errors.scoreImage = 'Score image must be an image file!';
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateForm}
    >
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

            <Field type="file" name="scoreImage">
              {({ form }: { form: any }) => (
                <FormControl
                  htmlFor="scoreImage"
                  mb={defaultSpacing / 2}
                  isInvalid={form.errors.scoreImage && form.touched.scoreImage}
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
                  <FormErrorMessage>{form.errors.scoreImage}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field type="number" name="score">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  htmlFor="score"
                  mb={defaultSpacing / 2}
                  isInvalid={form.errors.score && form.touched.score}
                >
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
          {progressBarPercent > 0 && (
            <Progress
              value={progressBarPercent}
              hasStripe
              isAnimated={progressBarPercent !== 100}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default IngredientSubmissionForm;
