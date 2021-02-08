import React from 'react';
import { ScoresRepositoryProviderOptions } from './types';
import ScoresRepositoryContext from './context';

const ScoresRepositoryProvider = (options: ScoresRepositoryProviderOptions) => (
  <ScoresRepositoryContext.Provider
    value={{ scoresRepositoryInstance: options.scoresRepositoryInstance }}
  >
    {options.children}
  </ScoresRepositoryContext.Provider>
);

export default ScoresRepositoryProvider;
