import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { defaultPixel } from 'types/styled';
import { Ingredient, Summer2021Score } from 'types/summer2021';

import IngredientSubmissionForm from '../ingredient-submission-form';

const IngredientSubmissionModal = ({
  ingredient,
  isOpen,
  onClose,
}: {
  ingredient: Ingredient;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [
    submissionResult,
    setSubmissionResult,
  ] = useState<Summer2021Score | null>(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        {!submissionResult && (
          <>
            <ModalHeader>Submit score for {ingredient.song?.name}</ModalHeader>
            <ModalCloseButton />
            <IngredientSubmissionForm
              ingredientId={ingredient.id}
              maxScore={ingredient.song?.maxScore || 0}
              onSuccessfulSubmit={(score) => {
                setSubmissionResult(score);
              }}
              onCancelSubmit={onClose}
            />
          </>
        )}

        {submissionResult && (
          <>
            <ModalCloseButton />
            <ModalBody>
              <Box textAlign="center" mt={defaultPixel * 2}>
                <Heading>Congratulations!</Heading>
                <Text>
                  You have obtained a {submissionResult.gradedIngredient.grade}{' '}
                  {submissionResult.gradedIngredient.name}
                </Text>
                <Center>
                  <Image
                    w={256}
                    src={`${process.env.ASSETS_URL}${submissionResult.gradedIngredient.image256}`}
                    alt={`${submissionResult.gradedIngredient.name} ${submissionResult.gradedIngredient.grade}`}
                  />
                </Center>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default IngredientSubmissionModal;
