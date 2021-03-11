import { createContext } from 'react';
import { err } from 'types/result';
import { DancerGradedDish, Dish, DishSong, GradedDish } from 'types/summer2021';

import { DefaultDish, DefaultDishSubmissionResponse } from './constants';
import { DishesRepositoryContextInterface } from './types';

const initialContext = {
  dishesRepositoryInstance: {
    getById: async () =>
      err(new Error('dishes repository not initialized'), DefaultDish),
    getAll: async () =>
      err(new Error('dishes repository not initialized'), new Array<Dish>()),
    getSongs: async () =>
      err(
        new Error('dishes repository not initialized'),
        new Array<DishSong>(),
      ),
    getGrades: async () =>
      err(
        new Error('dishes repository not initialized'),
        new Array<GradedDish>(),
      ),
    getDancerGradedDishes: async () =>
      err(
        new Error('dishes repository not initialized'),
        new Array<DancerGradedDish>(),
      ),
    postSubmission: async () =>
      err(
        new Error('dishes repository not initialized'),
        DefaultDishSubmissionResponse,
      ),
  },
};

const DishesRepositoryContext = createContext<DishesRepositoryContextInterface>(
  initialContext,
);

export default DishesRepositoryContext;
