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
import CustomIconRatings from 'components/custom-icon-ratings';
import { DishSubmissionResponse } from 'context/dishes/types';
import React from 'react';
import { IoStar } from 'react-icons/io5';
import { defaultSpacing } from 'types/styled-components';
import { Dish } from 'types/summer2021';
import { convertGradeToNumber } from 'utils/summer2021';

import DishSubmissionForm from '../dish-submission-form';
import SongDisplay from '../song-display';

export const SONGS_VIEW = 'song';
export const COOK_VIEW = 'cook';
export const DISH_VIEW = 'dish';
export type View = typeof SONGS_VIEW | typeof COOK_VIEW | typeof DISH_VIEW;

const DishModal = ({
  view,
  dish,
  isOpen,
  onClose,
  dishResult,
  onDishReceived,
}: {
  view: View;
  dish: Dish;
  isOpen: boolean;
  onClose: () => void;
  dishResult: DishSubmissionResponse;
  onDishReceived: Function;
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Course - {dish.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {view === SONGS_VIEW &&
              dish.dishSongs.map(
                (ds) => ds.song && <SongDisplay key={ds.id} song={ds.song} />,
              )}
            {view === COOK_VIEW && (
              <DishSubmissionForm dish={dish} onDishReceived={onDishReceived} />
            )}
            {view === DISH_VIEW && (
              <>
                <Box textAlign="center" mt={defaultSpacing * 2}>
                  <Heading>Congratulations!</Heading>
                  <Text>
                    You have obtained a {dishResult.gradedDish.grade}{' '}
                    {dishResult.gradedDish.name}
                  </Text>
                  <Center>
                    <Image
                      w={256}
                      src={`${process.env.ASSETS_URL}${dishResult.gradedDish.image256}`}
                      alt={`${dishResult.gradedDish.name} ${dishResult.gradedDish.grade}`}
                    />
                  </Center>
                  <Center>
                    <CustomIconRatings
                      id={`${dishResult.gradedDish.id}-ratings`}
                      color="gold"
                      icon={IoStar}
                      rating={convertGradeToNumber(dishResult.gradedDish.grade)}
                      w={6}
                      h={6}
                    />
                  </Center>
                </Box>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DishModal;
