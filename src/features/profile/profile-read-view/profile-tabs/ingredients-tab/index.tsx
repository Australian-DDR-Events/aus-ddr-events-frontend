import { Center, SimpleGrid, Spinner, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  DancerGradedIngredientsFragment,
  useGetAllGradedIngredientsForDancerIdQuery,
} from 'types/graphql.generated';
import { defaultPixel } from 'types/styled';

import IngredientScoreDisplay from './ingredient-score-display';

const IngredientsTab = ({ dancerId }: { dancerId: string }) => {
  const [dancerGradedIngredients, setDancerGradedIngredients] = useState<
    DancerGradedIngredientsFragment[]
  >([]);
  const [
    { data: ingredientData, fetching: fetchingIngredients },
  ] = useGetAllGradedIngredientsForDancerIdQuery({
    variables: {
      dancerId,
    },
  });

  useEffect(() => {
    if (ingredientData?.ingredientsByDancerId) {
      setDancerGradedIngredients(ingredientData.ingredientsByDancerId);
    }
  }, [ingredientData]);

  const [isLargerThan1440] = useMediaQuery(['(min-width: 1440px)']);

  if (fetchingIngredients)
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
        <IngredientScoreDisplay key={dgi.id} dancerGradedIngredient={dgi} />
      ))}
    </SimpleGrid>
  );
};

export default IngredientsTab;
