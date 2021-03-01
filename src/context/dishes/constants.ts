import { Dish, DishGrade, DishSong, DishSubmissionResponse } from './types';

export const DefaultDish: Dish = {
  id: '',
  name: '',
  image32: '',
  image64: '',
  image128: '',
  image256: '',
};

export const DefaultDishSong: DishSong = {
  id: '',
  cookingOrder: 0,
  cookingMethod: '',
  songId: '',
}

export const DefaultDishGrade: DishGrade = {
  id: '',
  description: '',
  grade: '',
  image32: '',
  image64: '',
  image128: '',
  image256: '',
}

export const DefaultDishSubmissionResponse: DishSubmissionResponse = {
  id: '',
  gradedDishId: '',
  dancerId: '',
};
