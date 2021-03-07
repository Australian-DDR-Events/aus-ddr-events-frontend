import { IngredientsRepositoryProviderOptions } from 'context/ingredients/types';
import React from 'react';

import IngredientsRepositoryContext from './context';

const IngredientsRepositoryProvider = (
  options: IngredientsRepositoryProviderOptions,
) => (
  <IngredientsRepositoryContext.Provider
    value={{
      ingredientsRepositoryInstance: options.instance,
    }}
  >
    {options.children}
  </IngredientsRepositoryContext.Provider>
);

export default IngredientsRepositoryProvider;
