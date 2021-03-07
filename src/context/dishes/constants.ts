import { DishSubmissionResponse } from '~/context/dishes/types';
import { Dish, DishSong, GradedDish, Ingredient } from '~/types/summer2021';

export const DefaultDish: Dish = {
  id: '',
  name: '',
  songs: new Array<DishSong>(),
  ingredients: new Array<Ingredient>(),
  type: 'dish',
  image32: '',
  image64: '',
  image128: '',
  image256: '',
};

export const DefaultDishSong: DishSong = {
  id: '',
  cookingOrder: 0,
  cookingMethod: '',
  song: null,
};

export const DefaultDishGrade: GradedDish = {
  id: '',
  type: 'gradedDish',
  name: '',
  description: '',
  grade: '',
  image32: '',
  image64: '',
  image128: '',
  image256: '',
};

export const DefaultDishSubmissionResponse: DishSubmissionResponse = {
  id: '',
  gradedDishId: '',
  dancerId: '',
};
