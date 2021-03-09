/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Progress,
  Switch,
} from '@chakra-ui/react';
import ImageUploadFormField from 'components/image-upload-form-field';
import { DishesRepositoryContext } from 'context/dishes';
import { DishSubmissionRequest } from 'context/dishes/types';
import { ScoreSubmissionRequest } from 'context/scores';
import {
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
  FormikState,
} from 'formik';
import React, { useContext, useState } from 'react';
import { Dish } from 'types/summer2021';

import { DishSubmissionFormData, ScoreSubmissonFormData } from '../types';
import DishSongSubmissionForm from './dish-song-submission-form';
import { DefaultDishSubmissionSongForm, FinalSubmissionForm } from './types';

const DishSubmissionForm = ({
  dish,
  onDishReceived,
}: {
  dish: Dish;
  onDishReceived: Function;
}) => {
  const [scoreSubmissions] = useState(new Array<ScoreSubmissonFormData>());
  const [finalImageUrl, setFinalImageUrl] = useState<string>('');
  const [dishSongSelections, setDishSongSelections] = useState(dish.dishSongs);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const dishesRepo = useContext(DishesRepositoryContext);

  const initialValues: DishSubmissionFormData = {
    dishId: dish.id,
    scores: new Array<ScoreSubmissonFormData>(),
    pairBonus: false,
    finalImage: undefined,
  };

  const onPreviousPage = (
    values: DishSubmissionFormData,
    formikHelpers: FormikHelpers<DishSubmissionFormData>,
  ) => {
    const submission = scoreSubmissions?.pop();
    setDishSongSelections(
      dish.dishSongs.filter(
        (ds) => !scoreSubmissions?.some((ss) => ss.songId === ds.song?.id),
      ),
    );
    formikHelpers.setSubmitting(false);
    // @ts-ignore
    formikHelpers.resetForm({ values: submission });
  };

  const onSubmitSongScore = (
    values: DishSubmissionFormData,
    formikHelpers: FormikHelpers<DishSubmissionFormData>,
  ) => {
    // @ts-ignore
    scoreSubmissions?.push(values);
    formikHelpers.setSubmitting(false);
    // @ts-ignore
    formikHelpers.resetForm({ values: DefaultDishSubmissionSongForm });
    setDishSongSelections(
      dish.dishSongs.filter(
        (ds) => !scoreSubmissions?.some((ss) => ss.songId === ds.song?.id),
      ),
    );
  };

  const onFinalSubmission = (
    values: FinalSubmissionForm,
    helpers: FormikHelpers<FinalSubmissionForm>,
  ) => {
    const dishSubmission: DishSubmissionRequest = {
      // @ts-ignore
      scores: scoreSubmissions,
      pairBonus: values.pairBonus,
      finalImage: values.finalImage,
    };
    dishesRepo.dishesRepositoryInstance
      .postSubmission(dish.id, dishSubmission, (progressEvent: any) => {
        setProgressBarPercent(
          Math.round(progressEvent.loaded * 100) / progressEvent.total,
        );
      })
      .then((result) => {
        helpers.setSubmitting(false);
        if (result.isOk()) {
          onDishReceived(result.value);
        }
      });
  };

  const validateForm = (values: FinalSubmissionForm) => {
    const errors: FormikErrors<FinalSubmissionForm> = {};
    if (!values.finalImage?.type.startsWith('image/'))
      errors.finalImage = 'Score image must be an image file!';
    return errors;
  };

  return (
    <>
      {dishSongSelections.length ? (
        <DishSongSubmissionForm
          dishSongs={dishSongSelections}
          // @ts-ignore
          onSubmit={onSubmitSongScore}
          // @ts-ignore
          onPrevious={onPreviousPage}
          hasPrevious={!!scoreSubmissions.length}
        />
      ) : (
        <Formik
          // @ts-ignore
          initialValues={initialValues}
          onSubmit={onFinalSubmission}
          validate={validateForm}
        >
          {(props: FormikProps<FinalSubmissionForm>) => (
            <Form>
              <Field type="pairBonus">
                {({
                  field,
                  form,
                }: {
                  field: string;
                  form: FormikState<DishSubmissionFormData>;
                }) => (
                  <FormControl
                    htmlFor="pairBonus"
                    mb={4}
                    isInvalid={Boolean(
                      form.errors.pairBonus && form.touched.pairBonus,
                    )}
                  >
                    <FormLabel>Pair bonus?</FormLabel>
                    <Switch id="pairBonus" {...field} />
                    <FormErrorMessage>{form.errors.pairBonus}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field type="file" name="finalImage">
                {({ form }: { form: FormikState<ScoreSubmissionRequest> }) => (
                  <ImageUploadFormField
                    label="Final score image"
                    fieldName="finalImage"
                    isInvalid={Boolean(
                      form.errors.scoreImage && form.touched.scoreImage,
                    )}
                    imagePosition="top"
                    imageUrl={finalImageUrl}
                    formError={form.errors.scoreImage}
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        props.setFieldValue(
                          'finalImage',
                          event.currentTarget.files[0],
                        );
                        setFinalImageUrl(
                          URL.createObjectURL(event.currentTarget.files[0]),
                        );
                      }
                    }}
                  />
                )}
              </Field>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={props.isSubmitting}
                mr={4}
              >
                Submit
              </Button>
              {progressBarPercent > 0 && (
                <Progress
                  value={progressBarPercent}
                  hasStripe
                  isAnimated={progressBarPercent === 100}
                />
              )}
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default DishSubmissionForm;
