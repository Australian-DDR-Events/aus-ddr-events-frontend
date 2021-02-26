import { Ingredient, IngredientGrade } from './types';

// eslint-disable-next-line import/prefer-default-export
export const DefaultIngredient: Ingredient = {
  id: '',
  name: '',
  songId: '',
  image32: '',
  image64: '',
  image128: '',
  image256: '',
};

export const DefaultGrade: IngredientGrade = {
  id: '',
  grade: '',
  requiredScore: 0,
  description: ''
}
