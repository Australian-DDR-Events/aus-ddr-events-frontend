import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
} from '@chakra-ui/react';
import ImageUploadFormField from 'components/image-upload-form-field';
import { ScoreSubmissionRequest } from 'context/scores';
import {
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikProps,
  FormikState,
} from 'formik';
import React, { useState } from 'react';
import { DishSong } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';

import {
  DefaultDishSubmissionSongForm,
  ScoreSubmissonFormData,
} from '../types';

const DishSongSubmissionForm = ({
  dishSongs,
  onSubmit,
  hasPrevious,
  onPrevious,
  isHidden,
}: {
  isHidden: boolean;
  dishSongs: DishSong[];
  onSubmit: (values: ScoreSubmissonFormData) => void;
  hasPrevious: boolean;
  onPrevious: () => void;
}) => {
  const [scoreImageUrl, setScoreImageUrl] = useState<string>('');
  const [direction, setDirection] = useState('');
  const [selectedSong, setSelectedSong] = useState<DishSong | undefined>(
    undefined,
  );

  const getSelectedSong = (id: string) =>
    dishSongs.find((ds) => ds.song?.id === id);

  const handleFormMovement = (values: ScoreSubmissionRequest) => {
    if (direction === 'next') onSubmit(values);
    else if (direction === 'previous') onPrevious();
  };

  const validateForm = (
    values: ScoreSubmissonFormData,
  ): FormikErrors<ScoreSubmissionRequest> => {
    const errors: FormikErrors<ScoreSubmissionRequest> = {};

    if (direction === 'previous') return errors;

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
    <Box {...(isHidden && { display: 'none' })}>
      {selectedSong && (
        <Image src={getAssetUrl(selectedSong.song?.image128 || '')} mb={2} />
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
        {(props: FormikProps<ScoreSubmissionRequest>) => (
          <Form>
            <Field type="select" name="songId">
              {({
                field,
                form,
              }: {
                field: string;
                form: FormikState<ScoreSubmissionRequest>;
              }) => (
                <FormControl
                  htmlFor="songId"
                  mb={4}
                  isInvalid={Boolean(form.errors.songId && form.touched.songId)}
                >
                  <FormLabel>Cooking method</FormLabel>
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
                form: FormikState<ScoreSubmissonFormData>;
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
            {hasPrevious && (
              <Button
                type="submit"
                onClick={() => setDirection('previous')}
                mr={4}
                mb={4}
              >
                Previous
              </Button>
            )}
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => setDirection('next')}
              mr={4}
              mb={4}
            >
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DishSongSubmissionForm;
