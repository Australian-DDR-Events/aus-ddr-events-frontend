import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  Progress,
} from '@chakra-ui/react';
import ImageUploadFormField from 'components/image-upload-form-field';
import {
  IngredientsRepositoryContext,
  ScoreSubmissionRequest,
} from 'context/ingredients';
import {
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
  FormikState,
} from 'formik';
import React, { useContext, useEffect, useState } from 'react';
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

  const validateForm = (values: ScoreSubmissionRequest) => {
    const errors: FormikErrors<ScoreSubmissionRequest> = {};
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
      {(props: FormikProps<ScoreSubmissionRequest>) => (
        <Form>
          <ModalBody>
            {apiErrorMessage && (
              <Alert status="error" borderRadius="md" mb={4}>
                <Box flex="1">
                  <AlertTitle mr={2}>Uh oh!</AlertTitle>
                  <AlertDescription>{apiErrorMessage}</AlertDescription>
                </Box>
              </Alert>
            )}

            <Field type="file" name="scoreImage">
              {({ form }: { form: FormikState<ScoreSubmissionRequest> }) => (
                <ImageUploadFormField
                  label="Score image"
                  fieldName="scoreImage"
                  isInvalid={Boolean(
                    form.errors.scoreImage && form.touched.scoreImage,
                  )}
                  imagePosition="top"
                  imageUrl={scoreImageUrl}
                  formError={form.errors.scoreImage}
                  onChange={(event) => {
                    if (event.currentTarget.files) {
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
              )}
            </Field>

            <Field type="number" name="score">
              {({
                field,
                form,
              }: {
                field: string;
                form: FormikState<ScoreSubmissionRequest>;
              }) => (
                <FormControl
                  htmlFor="score"
                  mb={4}
                  isInvalid={Boolean(form.errors.score && form.touched.score)}
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
              isLoading={props.isSubmitting}
              mr={4}
            >
              Save
            </Button>
            <Button
              colorScheme="gray"
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
