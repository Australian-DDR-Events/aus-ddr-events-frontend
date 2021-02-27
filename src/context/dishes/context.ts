import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultDish, DefaultDishSubmissionResponse } from './constants';
import { Dish, DishesRepositoryContextInterface, DishGrade } from './types';

const initialContext = {
  dishesRepositoryInstance: {
    getById: async () =>
      err(new Error('dishes repository not initialized'), DefaultDish),
    getAll: async () =>
      err(new Error('dishes repository not initialized'), new Array<Dish>()),
    getGrades: async () =>
      err(
        new Error('dishes repository not initialized'),
        new Array<DishGrade>(),
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