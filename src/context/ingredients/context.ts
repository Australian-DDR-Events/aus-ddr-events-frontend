import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultIngredient } from './constants';
import { Ingredient, IngredientsRepositoryContextInterface } from './types';

const initialContext = {
  ingredientsRepositoryInstance: {
    getAll: async () =>
      err(new Error('ingredients repository not initialized'), new Array<Ingredient>()),
    getById: async () =>
      err(new Error('ingredients repository not initialized'), DefaultIngredient),
  },
};

const IngredientsRepositoryContext = createContext<IngredientsRepositoryContextInterface>(
  initialContext,
);

export default IngredientsRepositoryContext;
