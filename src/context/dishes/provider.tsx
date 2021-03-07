import React from 'react';

import DishesRepositoryContext from './context';
import { DishesRepositoryProviderOptions } from './types';

const DishesRepositoryProvider = (options: DishesRepositoryProviderOptions) => (
  <DishesRepositoryContext.Provider
    value={{ dishesRepositoryInstance: options.instance }}
  >
    {options.children}
  </DishesRepositoryContext.Provider>
);

export default DishesRepositoryProvider;
