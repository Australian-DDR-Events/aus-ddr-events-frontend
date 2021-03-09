import { Badge, Box, Image, Text, useDisclosure } from '@chakra-ui/react';
import CustomIconRatings from 'components/custom-icon-ratings';
import React from 'react';
import { IoStar } from 'react-icons/io5';
import { defaultPixel } from 'types/styled';
import { DancerGradedIngredient, Ingredient } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';
import { convertGradeToNumber } from 'utils/summer2021';

import IngredientSubmissionModal from '../ingredient-submission-modal';

const IngredientSong = ({
  ingredient,
  dancerGradedIngredient,
}: {
  ingredient: Ingredient;
  dancerGradedIngredient?: DancerGradedIngredient;
}) => {
  if (!ingredient.song) return null;

  const ingredientIconWidth = 128;
  const currentSongColor = getColorByDifficulty(ingredient.song.difficulty);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        w={defaultPixel * 32}
        borderWidth={2}
        borderColor={currentSongColor.border}
        boxShadow={`${defaultPixel * 1.5}px ${defaultPixel * 1.5}px 0 ${
          currentSongColor.shadow
        }`}
        transition="box-shadow 300ms ease-in-out"
        _hover={{
          boxShadow: `${defaultPixel * 1.5 * 1.5}px ${
            defaultPixel * 1.5 * 1.5
          }px 0 ${currentSongColor.shadow}`,
        }}
        borderRadius="lg"
        overflow="hidden"
        mb={8}
        cursor="pointer"
        onClick={onOpen}
      >
        <Image
          src={getAssetUrl(ingredient.song.image256)}
          alt={ingredient.song.name}
        />
        <Box ml={4}>
          <Text fontWeight="bold" fontSize="lg" mt={2}>
            {ingredient.song.name}
          </Text>
          <Text color="gray" mt={-1} mb={1}>
            {ingredient.song.artist}
          </Text>
          <Badge colorScheme="gray" mb={2} mr={1}>
            Level {ingredient.song.level}
          </Badge>
          <Badge colorScheme={currentSongColor.badge} mb={2}>
            {ingredient.song.difficulty}
          </Badge>
        </Box>

        <Box d="flex" mb={2} minH="90px">
          <Box ml={4} mt={2}>
            <Text
              m={0}
              color={
                dancerGradedIngredient ? currentSongColor.shadow : 'gray.400'
              }
              fontWeight="bold"
              lineHeight={1}
              mb={2}
            >
              {dancerGradedIngredient &&
                `You've obtained ${dancerGradedIngredient.gradedIngredient.description}
              ${dancerGradedIngredient.gradedIngredient.name}`}
              {!dancerGradedIngredient && (
                <>You don&apos;t have any {ingredient.name}. Play to obtain</>
              )}
            </Text>

            {dancerGradedIngredient && (
              <CustomIconRatings
                id={`${ingredient.id}-ratings`}
                color={currentSongColor.shadow}
                icon={IoStar}
                rating={convertGradeToNumber(
                  dancerGradedIngredient?.gradedIngredient.grade || '',
                )}
                w={6}
                h={6}
              />
            )}
          </Box>
          <Box mr={4}>
            <Image
              w={`${ingredientIconWidth}px`}
              src={
                dancerGradedIngredient
                  ? getAssetUrl(
                      dancerGradedIngredient.gradedIngredient.image128,
                    )
                  : getAssetUrl(ingredient.image128)
              }
              borderWidth={2}
              borderColor="white"
              {...(!dancerGradedIngredient && {
                filter: 'grayscale(100%)',
                opacity: 0.5,
              })}
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
