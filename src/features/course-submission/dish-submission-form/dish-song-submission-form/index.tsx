import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
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
import React, { useState } from 'react';
import { defaultSpacing } from 'types/styled';
import { DishSong } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';

import {
  DefaultDishSubmissionSongForm,
  DishSubmissionSongForm,
} from '../types';

const DishSongSubmissionForm = ({
  dishSongs,
  onSubmit,
  hasPrevious,
  onPrevious,
}: {
  dishSongs: DishSong[];
  onSubmit: (
    values: DishSubmissionSongForm,
    formikHelpers: FormikHelpers<DishSubmissionSongForm>,
  ) => void;
  hasPrevious: boolean;
  onPrevious: (
    values: DishSubmissionSongForm,
    formikHelpers: FormikHelpers<DishSubmissionSongForm>,
  ) => void;
}) => {
  const [scoreImageUrl, setScoreImageUrl] = useState<string>('');
  const [direction, setDirection] = useState(true);
  const [selectedSong, setSelectedSong] = useState<DishSong | undefined>(
    undefined,
  );

  const getSelectedSong = (id: string) =>
    dishSongs.find((ds) => ds.song?.id === id);

  const handleFormMovement = (
    values: DishSubmissionSongForm,
    formikHelpers: FormikHelpers<DishSubmissionSongForm>,
  ) => {
    if (direction) onSubmit(values, formikHelpers);
    else onPrevious(values, formikHelpers);
  };

  const validateForm = (
    values: DishSubmissionSongForm,
  ): FormikErrors<ScoreSubmissionRequest> => {
    const errors: FormikErrors<ScoreSubmissionRequest> = {};
    if (!direction) return errors;
    if (!values.songId) errors.songId = 'No song selected!';
    if (
      values.score < 0 ||
      values.score > (getSelectedSong(values.songId)?.song?.maxScore || 0)
    )
      errors.score = 'Score provided is too high!';
    if (!values.scoreImage?.type.startsWith('image/'))
      errors.scoreImage = 'Score image must be an image file!';
    return errors;
  };

  return (
    <>
      {selectedSong ? (
        <Image src={getAssetUrl(selectedSong.song?.image128 || '')} />
      ) : (
        <Image />
      )}
      <Formik
        initialValues={DefaultDishSubmissionSongForm}
        onSubmit={handleFormMovement}
        validate={validateForm}
        onReset={(values) => {
          setScoreImageUrl(
            values.scoreImage.size
              ? URL.createObjectURL(values.scoreImage)
              : '',
          );
          setSelectedSong(dishSongs.find((s) => s.song?.id === values.songId));
        }}
      >
        {(props: FormikProps<DishSubmissionSongForm>) => (
          <Form>
            <Field type="select" name="songId">
              {({
                field,
                form,
              }: {
                field: string;
                form: FormikState<DishSubmissionSongForm>;
              }) => (
                <FormControl
                  htmlFor="songId"
                  mb={defaultSpacing / 2}
                  isInvalid={Boolean(form.errors.songId && form.touched.songId)}
                >
                  <FormLabel>Cooking Method</FormLabel>
                  <Select id="songId" {...field} placeholder="Select a song">
                    {dishSongs.map((dishSong) => (
                      <option
                        key={dishSong.song?.id}
                        value={dishSong.song?.id}
                      >{`${dishSong.cookingMethod} - ${dishSong.song?.name}`}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{form.errors.songId}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field type="file" name="scoreImage">
              {({ form }: { form: FormikState<DishSubmissionSongForm> }) => (
                <FileUploadFormField
                  label="Score image"
                  fieldName="scoreImage"
                  isInvalid={Boolean(
                    form.errors.scoreImage && form.touched.scoreImage,
                  )}
                  scoreImageUrl={scoreImageUrl}
                  formError={form.errors.scoreImage}
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
              )}
            </Field>

            <Field type="number" name="score">
              {({
                field,
                form,
              }: {
                field: string;
                form: FormikState<DishSubmissionSongForm>;
              }) => (
                <FormControl
                  htmlFor="score"
                  mb={defaultSpacing / 2}
                  isInvalid={Boolean(form.errors.score && form.touched.score)}
                >
                  <FormLabel>EX score</FormLabel>
                  <Input {...field} id="score" type="number" />
                  <FormErrorMessage>{form.errors.score}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {hasPrevious && (
              <Button
                type="submit"
                onClick={() => setDirection(false)}
                // eslint-disable-next-line react/prop-types
                isLoading={props.isSubmitting}
                mr={defaultSpacing / 2}
                mb={defaultSpacing / 2}
              >
                Previous
              </Button>
            )}
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => setDirection(true)}
              // eslint-disable-next-line react/prop-types
              isLoading={props.isSubmitting}
              mr={defaultSpacing / 2}
              mb={defaultSpacing / 2}
            >
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default DishSongSubmissionForm;
