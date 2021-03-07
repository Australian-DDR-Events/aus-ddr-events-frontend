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
  FieldArray,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
  FormikState,
} from 'formik';
import React, { useState } from 'react';
import { Song } from 'types/core';
import { defaultSpacing } from 'types/styled-components';
import { Dish } from 'types/summer2021';

import { DishSubmissionFormData, ScoreSubmissonFormData } from '../../types';

const DishSubmissionForm = ({ dish }: { dish: Dish }) => {
  const [scoreSubmissions, setScoreSubmissions] = useState<
    ScoreSubmissonFormData[]
  >();
  const [finalImageUrl, setFinalImageUrl] = useState<string>('');

  const initialValues: DishSubmissionFormData = {
    dishId: dish.id,
    scores: new Array<ScoreSubmissonFormData>(),
    pairBonus: false,
    finalImage: undefined,
  };

  const initialDishSongSubmission: ScoreSubmissonFormData = {
    songId: undefined,
    score: undefined,
    scoreImage: undefined,
  };

  const validateForm = (values: DishSubmissionFormData) => {};

  const onSubmit = (
    values: DishSubmissionFormData,
    formikHelpers: FormikHelpers<DishSubmissionFormData>,
  ) => {
    console.log(values);
    formikHelpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateForm}
    >
      {(props: FormikProps<DishSubmissionFormData>) => (
        <Form>
          <FieldArray name="scores">
            {({ move, swap, push, insert, unshift, pop, form }) => {
              return (
                <Form>
                  {props.values.scores.length < 3 && (
                    <Button
                      onClick={() => {
                        if (props.values.scores.length === 0)
                          push(initialDishSongSubmission);
                        if (props.values.scores.length > 0)
                          insert(
                            props.values.scores.length,
                            initialDishSongSubmission,
                          );
                      }}
                    >
                      Add score submission
                    </Button>
                  )}
                  {props.values.scores.map((score, index) => (
                    <DishSongSubmissionForm
                      key={new Date().toISOString()}
                      formProps={props}
                      orderIndex={index}
                      songs={dish.dishSongs
                        .map((ds) => ds.song)
                        .filter((s): s is Song => Boolean(s))}
                    />
                  ))}
                </Form>
              );
            }}
          </FieldArray>

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
  );
};

export default DishSubmissionForm;
