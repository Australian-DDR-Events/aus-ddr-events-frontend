import { Dish, DishSubmissionResponse } from './types';

export const DefaultDish: Dish = {
  id: '',
  name: '',
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
