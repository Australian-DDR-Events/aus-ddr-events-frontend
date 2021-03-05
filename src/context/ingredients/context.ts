import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultSummer2021Score } from '../scores/constants';
import { DefaultIngredient } from './constants';
import {
  Ingredient,
  IngredientGrade,
  IngredientsRepositoryContextInterface,
} from './types';

const initialContext = {
  ingredientsRepositoryInstance: {
    getAll: async () =>
      err(
        new Error('ingredients repository not initialized'),
        new Array<Ingredient>(),
      ),
    getById: async () =>
      err(
        new Error('ingredients repository not initialized'),
        DefaultIngredient,
      ),
    getGrades: async () =>
      err(
        new Error('ingredients repository not initialized'),
        new Array<IngredientGrade>(),
      ),
    postScoreSubmission: async () =>
      err(
        new Error('ingredients repository not initialized'),
        DefaultSummer2021Score,
      ),
  },
};

// eslint-disable-next-line max-len
const IngredientsRepositoryContext = createContext<IngredientsRepositoryContextInterface>(
  initialContext,
);

export default IngredientsRepositoryContext;
