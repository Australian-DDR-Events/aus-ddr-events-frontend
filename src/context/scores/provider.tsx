import React from 'react';
import { ScoresRepositoryProviderOptions } from './types';
import ScoresRepositoryContext from './context';

const ScoresRepositoryProvider = (options: ScoresRepositoryProviderOptions) => (
  <ScoresRepositoryContext.Provider
    value={{ scoresRepositoryInstance: options.instance }}
  >
    {options.children}
  </ScoresRepositoryContext.Provider>
);

export default ScoresRepositoryProvider;
