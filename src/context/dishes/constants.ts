import { Dish, DishSubmissionResponse } from './types';

// eslint-disable-next-line import/prefer-default-export
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
