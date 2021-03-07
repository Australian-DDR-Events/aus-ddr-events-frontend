import { Image } from '@chakra-ui/react';
import React from 'react';
import { Ingredient } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';

const RequiredIngredientDisplay = ({
  ingredient,
}: {
  ingredient: Ingredient;
}) => {
  return <Image src={getAssetUrl(ingredient.image64)} />;
};

export default RequiredIngredientDisplay;
