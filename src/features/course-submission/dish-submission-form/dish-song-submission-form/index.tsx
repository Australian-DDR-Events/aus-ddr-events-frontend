import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
} from '@chakra-ui/react';
import FileUploadFormField from 'components/score-submission-form';
import { ScoreSubmissionRequest } from 'context/scores';
import { Field, Form, FormikProps, FormikState } from 'formik';
import React, { ChangeEvent, useState } from 'react';
import { Song } from 'types/core';
import { defaultSpacing } from 'types/styled-components';
import { getAssetUrl } from 'utils/assets';

import { DishSubmissionFormData } from '../../../../types';

const DishSongSubmissionForm = ({
  orderIndex,
  songs,
  formProps,
}: {
  orderIndex: number;
  songs: Song[];
  formProps: FormikProps<DishSubmissionFormData>;
}) => {
  const [scoreImageUrl, setScoreImageUrl] = useState<string>('');

  const selectedSong: Song | undefined = formProps.values.scores[orderIndex]
    ?.songId
    ? songs.find((s) => s.id === formProps.values.scores[orderIndex]?.songId)
    : undefined;

  const onScoreImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      formProps.setFieldValue('scoreImage', event.currentTarget.files[0]);
      setScoreImageUrl(URL.createObjectURL(event.currentTarget.files[0]));
    }
  };

  return (
    <>
      {selectedSong && <Image src={getAssetUrl(selectedSong.image128)} />}
      <Form>
        <Field name={`scores[${orderIndex}].songId`}>
          {({
            field,
            form,
          }: {
            field: string;
            form: FormikState<ScoreSubmissionRequest>;
          }) => (
            <FormControl
              htmlFor="score"
              mb={defaultSpacing / 2}
              isInvalid={Boolean(form.errors.score && form.touched.score)}
            >
              <Select placeholder="Select a song..." {...field}>
                {songs.map((song) => (
                  <option
                    key={song.id + new Date().toISOString()}
                    value={song.id}
                  >
                    {song.name} - {song.artist}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
        </Field>
        <Field type="file" name={`scores[${orderIndex}].scoreImage`}>
          {({ form }: { form: FormikState<ScoreSubmissionRequest> }) => (
            <FileUploadFormField
              label="Score image"
              fieldName={`scores[${orderIndex}].scoreImage`}
              isInvalid={Boolean(
                form.errors.scoreImage && form.touched.scoreImage,
              )}
              scoreImageUrl={scoreImageUrl}
              formError={form.errors.scoreImage}
              onChange={onScoreImageUpload}
            />
          )}
        </Field>
        <Field type="number" name={`scores[${orderIndex}].score`}>
          {({
            field,
            form,
          }: {
            field: string;
            form: FormikState<ScoreSubmissionRequest>;
          }) => (
            <FormControl
              htmlFor={`scores[${orderIndex}].score`}
              mb={defaultSpacing / 2}
              isInvalid={Boolean(form.errors.score && form.touched.score)}
            >
              <FormLabel>EX score</FormLabel>
              <Input
                {...field}
                id={`scores[${orderIndex}].score`}
                type="number"
              />
              <FormErrorMessage>{form.errors.score}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Form>
    </>
  );
};

export default DishSongSubmissionForm;
