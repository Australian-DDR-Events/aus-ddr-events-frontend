import { Center, SimpleGrid, Spinner, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Song } from 'types/core';
import { defaultPixel } from 'types/styled';
import { DancerGradedIngredient } from 'types/summer2021';

import IngredientScoreDisplay from './ingredient-score-display';

const IngredientsTab = ({
  dancerGradedIngredients,
  songs,
  isLoading,
  loadGradedIngredients,
}: {
  dancerGradedIngredients: DancerGradedIngredient[];
  songs: Map<string, Song>;
  isLoading: boolean;
  loadGradedIngredients: () => void;
}) => {
  useEffect(() => {
    loadGradedIngredients();
  }, []);

  const [isLargerThan1440] = useMediaQuery(['(min-width: 1440px)']);

  if (isLoading)
    return (
      <Center>
        <Spinner // todo: replace this with proper skeleton structure
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );

  return (
    <SimpleGrid
      spacing={8}
      columns={isLargerThan1440 ? 2 : 1}
      mt={2}
      mb={8}
      w="fit-content"
      pr={isLargerThan1440 ? defaultPixel : 0}
    >
      {dancerGradedIngredients.map((dgi) => (
        <IngredientScoreDisplay
          key={dgi.id}
          dancerGradedIngredient={dgi}
          song={songs.get(dgi.score.songId)}
        />
      ))}
    </SimpleGrid>
  );
};

export default IngredientsTab;
