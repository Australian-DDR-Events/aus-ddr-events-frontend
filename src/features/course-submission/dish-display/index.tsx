import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { DancerGradedIngredient, Dish } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';

import { DefaultDishSubmissionResponse } from '../../../context/dishes/constants';
import { DishSubmissionResponse } from '../../../context/dishes/types';
import DishModal, {
  COOK_VIEW,
  DISH_VIEW,
  SONGS_VIEW,
  View,
} from '../dish-modal';
import RequiredIngredientDisplay from '../required-ingredient-display';

const DishDisplay = ({
  dish,
  obtainedIngredients,
}: {
  dish: Dish;
  obtainedIngredients: DancerGradedIngredient[];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalView, setModalView] = useState<View>(SONGS_VIEW);
  const [dishResult, setDishResult] = useState<DishSubmissionResponse>(
    DefaultDishSubmissionResponse,
  );
  const hasObtainedAllRequiredIngredients = dish.ingredients.every((i) =>
    obtainedIngredients.some((oi) => oi.gradedIngredient.name === i.name),
  );
  const onDishReceived = (dishResponse: DishSubmissionResponse) => {
    setDishResult(dishResponse);
    setModalView(DISH_VIEW);
  };
  return (
    <Box p={4} w="fit-content" borderWidth={2} borderRadius="lg">
      <Heading textAlign="center" fontSize="xl">
        {dish.name}
      </Heading>
      <Center>
        <Image src={getAssetUrl(dish.image256)} />
      </Center>
      <Center w="100%" mb={8}>
        <Flex maxW="100%" margin="0 auto" spacing={4}>
          {dish.ingredients.map((i) => (
            <RequiredIngredientDisplay
              key={i.id}
              ingredient={i}
              obtainedIngredient={obtainedIngredients.find(
                (di) => di.gradedIngredient.name === i.name,
              )}
            />
          ))}
        </Flex>
      </Center>
      <Center mb={4}>
        <Button
          variant="solid"
          w="100%"
          onClick={() => {
            setModalView(SONGS_VIEW);
            onOpen();
          }}
        >
          View featuring songs
        </Button>
      </Center>
      <Center>
        <Button
          w="100%"
          colorScheme="pink"
          onClick={() => {
            setModalView(COOK_VIEW);
            onOpen();
          }}
          disabled={!hasObtainedAllRequiredIngredients}
        >
          {hasObtainedAllRequiredIngredients
            ? 'Cook this course'
            : 'Not enough ingredients to cook'}
        </Button>
        <DishModal
          view={modalView}
          dish={dish}
          isOpen={isOpen}
          onClose={onClose}
          dishResult={dishResult}
          onDishReceived={onDishReceived}
        />
      </Center>
    </Box>
  );
};

export default DishDisplay;
