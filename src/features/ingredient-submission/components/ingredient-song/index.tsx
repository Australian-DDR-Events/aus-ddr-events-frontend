import React from 'react';
import { DancerGradedIngredient, Ingredient } from 'types/summer2021';
import { Badge, Box, Image, Text, useDisclosure } from '@chakra-ui/react';
import { defaultSpacing } from 'types/styled-components';
import IngredientSubmissionModal from '../ingredient-submission-modal';

const getColorByDifficulty = (difficulty: string) => {
  if (difficulty === 'Expert')
    return {
      shadow: '#52b788',
      border: '#95d5b2',
      badge: 'green',
    };

  if (difficulty === 'Challenge')
    return {
      shadow: '#9d4edd',
      border: '#c77dff',
      badge: 'purple',
    };

  return {
    shadow: 'gray',
    badge: 'gray',
    border: 'gray',
  };
};

const getImageUrl = (imageUrl: string) =>
  `${process.env.ASSETS_URL}${imageUrl}`;

const IngredientSong = ({
  ingredient,
  dancerGradedIngredient,
}: {
  ingredient: Ingredient;
  dancerGradedIngredient?: DancerGradedIngredient;
}) => {
  const ingredientIconWidth = 128;
  const currentSongColor = getColorByDifficulty(ingredient.song.difficulty);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        w={defaultSpacing * 32}
        borderWidth={2}
        borderColor={currentSongColor.border}
        boxShadow={`${defaultSpacing * 1.5}px ${defaultSpacing * 1.5}px 0 ${
          currentSongColor.shadow
        }`}
        transition="box-shadow 300ms ease-in-out"
        _hover={{
          boxShadow: `${defaultSpacing * 1.5 * 1.5}px ${
            defaultSpacing * 1.5 * 1.5
          }px 0 ${currentSongColor.shadow}`,
        }}
        borderRadius="lg"
        overflow="hidden"
        mb={defaultSpacing}
      >
        <Image
          src={getImageUrl(ingredient.song.image256)}
          alt={ingredient.song.name}
          onClick={onOpen}
          cursor="pointer"
        />
        <Text
          fontWeight="bold"
          fontSize="lg"
          mt={defaultSpacing / 2}
          ml={defaultSpacing / 2}
        >
          {ingredient.song.name}
        </Text>
        <Box d="flex">
          <Box ml={defaultSpacing / 2}>
            <Text color="gray" mt={-1} mb={1}>
              {ingredient.song.artist}
            </Text>
            <Badge colorScheme={currentSongColor.badge} mb={defaultSpacing / 4}>
              {ingredient.song.difficulty}
            </Badge>
            <Text>Play this song to obtain {ingredient.name}</Text>
          </Box>
          <Box mr={defaultSpacing / 2} mb={defaultSpacing / 2}>
            <Image
              w={`${ingredientIconWidth}px`}
              src={
                dancerGradedIngredient
                  ? getImageUrl(
                      dancerGradedIngredient.gradedIngredient.image128,
                    )
                  : getImageUrl(ingredient.image128)
              }
              borderWidth={2}
              borderColor="white"
              {...(!dancerGradedIngredient && { filter: 'grayscale(100%)' })}
            />
          </Box>
        </Box>
      </Box>
      <IngredientSubmissionModal
        ingredient={ingredient}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default IngredientSong;
