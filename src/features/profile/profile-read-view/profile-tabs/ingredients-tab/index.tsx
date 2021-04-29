import { Center, SimpleGrid, Spinner, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useGetAllGradedIngredientsForDancerIdQuery } from 'types/graphql.generated';
import { defaultPixel } from 'types/styled';
import { DancerGradedIngredient } from 'types/summer2021';

import IngredientScoreDisplay from './ingredient-score-display';

const IngredientsTab = ({
  dancerId,
  dancerGradedIngredients,
  setDancerGradedIngredients,
}: {
  dancerId: string;
  dancerGradedIngredients: DancerGradedIngredient[];
  setDancerGradedIngredients: Function;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [result] = useGetAllGradedIngredientsForDancerIdQuery({
    variables: {
      dancerId,
    },
  });

  useEffect(() => {
    if (!result || result.fetching || !result.data) return;
    setDancerGradedIngredients(
      result.data.ingredientsByDancerId.map((dgi: DancerGradedIngredient) => ({
        ...dgi,
      })),
    );
    setIsLoading(false);
  }, [result]);

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
          songDifficulty={dgi.score.songDifficulty!}
        />
      ))}
    </SimpleGrid>
  );
};

export default IngredientsTab;
