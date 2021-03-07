/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import FileUploadFormField from 'components/score-submission-form';
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
import { defaultSpacing } from 'types/styled-components';
import { Dish } from 'types/summer2021';

import { DishesRepositoryContext } from '../../../context/dishes';
import { DishSubmissionRequest } from '../../../context/dishes/types';
import { DishSubmissionFormData, ScoreSubmissonFormData } from '../../types';
import DishSongSubmissionForm from './dish-song-submission-form';
import { DefaultDishSubmissionSongForm, FinalSubmissionForm } from './types';

const DishSubmissionForm = ({ dish }: { dish: Dish }) => {
  const [scoreSubmissions, setScoreSubmissions] = useState(
    new Array<ScoreSubmissonFormData>(),
  );
  const [finalImageUrl, setFinalImageUrl] = useState<string>('');
  const [dishSongSelections, setDishSongSelections] = useState(dish.dishSongs);
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
    console.log(submission);
    formikHelpers.resetForm({ values: submission });
  };

  const onSubmitSongScore = (
    values: DishSubmissionFormData,
    formikHelpers: FormikHelpers<DishSubmissionFormData>,
  ) => {
    scoreSubmissions?.push(values);
    formikHelpers.setSubmitting(false);
    formikHelpers.resetForm({ values: DefaultDishSubmissionSongForm });
    setDishSongSelections(
      dish.dishSongs.filter(
        (ds) => !scoreSubmissions?.some((ss) => ss.songId === ds.song?.id),
      ),
    );
  };

  const onFinalSubmission = (
    values: FinalSubmissionForm,
    formikHelpers: FormikHelpers<FinalSubmissionForm>,
  ) => {
    const dishSubmission: DishSubmissionRequest = {
      scores: scoreSubmissions,
      pairBonus: values.pairBonus,
      finalImage: values.finalImage,
    };
    console.lo;
    dishesRepo.dishesRepositoryInstance
      .postSubmission(dish.id, dishSubmission, () => {})
      .then((result) => {
        if (result.isOk()) console.log(result);
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
          onSubmit={onSubmitSongScore}
          onPrevious={onPreviousPage}
          hasPrevious={!!scoreSubmissions.length}
        />
      ) : (
        <Formik
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
                    mb={defaultSpacing / 2}
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
                  <FileUploadFormField
                    label="Final score image"
                    fieldName="finalImage"
                    isInvalid={Boolean(
                      form.errors.scoreImage && form.touched.scoreImage,
                    )}
                    scoreImageUrl={finalImageUrl}
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
                mr={defaultSpacing / 2}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default DishSubmissionForm;
