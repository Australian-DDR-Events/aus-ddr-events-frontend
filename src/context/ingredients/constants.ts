import { GradedIngredient, Ingredient } from 'types/summer2021';
import { DefaultSong } from '../songs';

export const DefaultIngredient: Ingredient = {
  id: '',
  name: '',
  type: 'ingredient',
  song: DefaultSong,
  image32: '',
  image64: '',
  image128: '',
  image256: '',
};

export const DefaultGrade: GradedIngredient = {
  id: '',
  grade: '',
  type: 'gradedIngredient',
  requiredScore: 0,
  description: '',
  name: '',
  image32: '',
  image64: '',
  image128: '',
  image256: '',
};
