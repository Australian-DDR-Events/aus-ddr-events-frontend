import React from 'react';
import { DishesRepositoryProviderOptions } from './types';
import DishesRepositoryContext from './context';

const DishesRepositoryProvider = (options: DishesRepositoryProviderOptions) => (
  <DishesRepositoryContext.Provider
    value={{ dishesRepositoryInstance: options.instance }}
  >
    {options.children}
  </DishesRepositoryContext.Provider>
);

export default DishesRepositoryProvider;
