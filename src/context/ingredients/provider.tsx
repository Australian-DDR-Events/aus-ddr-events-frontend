import React from 'react';
import { IngredientsRepositoryProviderOptions } from 'context/ingredients/types';
import IngredientsRepositoryContext from './context';

const IngredientsRepositoryProvider = (options: IngredientsRepositoryProviderOptions) => (
  <IngredientsRepositoryContext.Provider
    value={{ ingredientsRepositoryInstance: options.ingredientsRepositoryInstance }}
  >
    {options.children}
  </IngredientsRepositoryContext.Provider>
);

export default IngredientsRepositoryProvider;
