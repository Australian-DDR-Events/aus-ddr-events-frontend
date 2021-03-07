import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { defaultSpacing } from 'types/styled-components';
import { Dish } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';

import DishModal, { COOK_VIEW, SONGS_VIEW, View } from '../dish-modal';
import RequiredIngredientDisplay from '../required-ingredient-display';

const DishDisplay = ({ dish }: { dish: Dish }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalView, setModalView] = useState<View>(SONGS_VIEW);
  return (
    <Box
      p={defaultSpacing / 2}
      w="fit-content"
      borderWidth={defaultSpacing / 4}
      borderRadius="lg"
    >
      <Heading textAlign="center" fontSize="xl">
        {dish.name}
      </Heading>
      <Center>
        <Image src={getAssetUrl(dish.image256)} />
      </Center>
      <Center w="100%" mb={defaultSpacing}>
        <HStack spacing={defaultSpacing / 2}>
          {dish.ingredients.map((i) => (
            <RequiredIngredientDisplay key={i.id} ingredient={i} />
          ))}
        </HStack>
      </Center>
      <Center mb={defaultSpacing / 2}>
        <Button
          variant="link"
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
          colorScheme="blue"
          onClick={() => {
            setModalView(COOK_VIEW);
            onOpen();
          }}
        >
          Cook
        </Button>
        <DishModal
          view={modalView}
          dish={dish}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Center>
    </Box>
  );
};

export default DishDisplay;
