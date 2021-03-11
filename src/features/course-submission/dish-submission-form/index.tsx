/* eslint-disable react/prop-types */
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Image,
  Progress,
  Spacer,
  Switch,
  Text,
} from '@chakra-ui/react';
import ImageUploadFormField from 'components/image-upload-form-field';
import { DishesRepositoryContext } from 'context/dishes';
import { DishSubmissionRequest } from 'context/dishes/types';
import { ScoreSubmissionRequest } from 'context/scores';
import { DefaultScoreSubmissionRequest } from 'context/scores/constants';
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
import { FiArrowRight } from 'react-icons/fi';
import { Dish } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';

import DishSongSubmissionForm from './dish-song-submission-form';
import {
  DishSubmissionFormData,
  FinalSubmissionForm,
  ScoreSubmissonFormData,
} from './types';

const DishSubmissionForm = ({
  dish,
  onDishReceived,
}: {
  dish: Dish;
  onDishReceived: Function;
}) => {
  const [scoreSubmissions, setScoreSubmissions] = useState([
    DefaultScoreSubmissionRequest,
    DefaultScoreSubmissionRequest,
    DefaultScoreSubmissionRequest,
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [finalImageUrl, setFinalImageUrl] = useState<string>('');
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [validationError, setValidationError] = useState('');
  const dishesRepo = useContext(DishesRepositoryContext);

  const initialValues: DishSubmissionFormData = {
    dishId: dish.id,
    scores: new Array<ScoreSubmissonFormData>(),
    pairBonus: false,
    finalImage: {
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

  const onPreviousSongScoreSubmission = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmitSongScore = (values: ScoreSubmissonFormData) => {
    setCurrentStep(currentStep + 1);

    const newScoreSubmissions = [...scoreSubmissions];
    newScoreSubmissions.splice(currentStep, 1, values);
    setScoreSubmissions(newScoreSubmissions);

    if (
      // if the next step is the final step
      currentStep + 1 === 3 &&
      // and there are duplicated songs
      new Set(scoreSubmissions.map((s) => s.songId)).size < 3
    ) {
      setValidationError(
        'You have a song that appears in more than 1 step in your cooking order. Please go back and make sure there is no song duplication.',
      );
    } else {
      setValidationError('');
    }
  };

  const onFinalSubmission = (
    values: FinalSubmissionForm,
    helpers: FormikHelpers<FinalSubmissionForm>,
  ) => {
    const dishSubmission: DishSubmissionRequest = {
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

  const scoreSubmissionComponents = Array(3)
    .fill('')
    .map((_, index) => (
      <DishSongSubmissionForm
        key={`${dish.id}-step-${index + 1}`}
        dishSongs={dish.dishSongs}
        onSubmit={onSubmitSongScore}
        onPrevious={onPreviousSongScoreSubmission}
        hasPrevious={index !== 0}
        isHidden={currentStep !== index}
      />
    ));

  return (
    <>
      {currentStep === 3 && validationError && (
        <Alert status="error" borderRadius="md" mb={4}>
          <Box flex="1">
            <AlertTitle mr={2}>Invalid cooking order</AlertTitle>
            <AlertDescription>{validationError}</AlertDescription>
          </Box>
        </Alert>
      )}

      {scoreSubmissionComponents}

      {/* TODO - Make CookingOrderDisplay component */}
      {currentStep === 3 && (
        <>
          <FormLabel>Cooking order</FormLabel>
          <Box mb={2}>
            <Flex w="100%" mb={2}>
              {scoreSubmissions.map((ss, index) => {
                const dishSong = dish.dishSongs.find(
                  (ds) => ds.song?.id === ss.songId,
                );
                return (
                  <>
                    <Image src={getAssetUrl(dishSong?.song?.image64 || '')} />
                    {index < 2 && (
                      <>
                        <Spacer />
                        <Center>
                          <Icon as={FiArrowRight} w={4} h={4} />
                        </Center>
                        <Spacer />
                      </>
                    )}
                  </>
                );
              })}
            </Flex>
            {scoreSubmissions.map((ss, index) => {
              const dishSong = dish.dishSongs.find(
                (ds) => ds.song?.id === ss.songId,
              );
              return (
                <Text>
                  <Badge mr={2} colorScheme="pink">
                    Step {index + 1}
                  </Badge>
                  {dishSong?.cookingMethod} - {dishSong?.song?.name}
                </Text>
              );
            })}
          </Box>
          {/* TODO - Make CookingOrderDisplay component */}

          {/* TODO - Move this to a separate FinalSubmissionForm component */}
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
                      mb={4}
                      isInvalid={Boolean(
                        form.errors.pairBonus && form.touched.pairBonus,
                      )}
                    >
                      <FormLabel>Pair bonus?</FormLabel>
                      <Switch id="pairBonus" {...field} />
                      <FormErrorMessage>
                        {form.errors.pairBonus}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field type="file" name="finalImage">
                  {({
                    form,
                  }: {
                    form: FormikState<ScoreSubmissionRequest>;
                  }) => (
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
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                  }}
                  isLoading={props.isSubmitting}
                  mr={4}
                >
                  Previous
                </Button>
                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={props.isSubmitting}
                  isDisabled={!!validationError}
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
          {/* TODO - Move this to a separate FinalSubmissionForm component */}
        </>
      )}
    </>
  );
};

export default DishSubmissionForm;
