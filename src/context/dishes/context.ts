import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultDish, DefaultDishSubmissionResponse } from './constants';
import { DishesRepositoryContextInterface } from './types';
import { Dish, DishSong, GradedDish } from '~/types/summer2021';

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
