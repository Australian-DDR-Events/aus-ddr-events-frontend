import { Image, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { DancerGradedIngredient, Ingredient } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';

const RequiredIngredientDisplay = ({
  ingredient,
  obtainedIngredient,
}: {
  ingredient: Ingredient;
  obtainedIngredient?: DancerGradedIngredient;
}) => {
  const tooltipLabel = obtainedIngredient
    ? `${obtainedIngredient.gradedIngredient.description} ${obtainedIngredient.gradedIngredient.name}`
    : 'Ingredient not obtained';
  return (
    <Tooltip label={tooltipLabel}>
      <Image
        src={getAssetUrl(ingredient.image64)}
        {...(!obtainedIngredient && { filter: 'grayscale(100%)' })}
      />
    </Tooltip>
  );
};

export default RequiredIngredientDisplay;
