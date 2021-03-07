import React from 'react';

import ScoresRepositoryContext from './context';
import { ScoresRepositoryProviderOptions } from './types';

const ScoresRepositoryProvider = (options: ScoresRepositoryProviderOptions) => (
  <ScoresRepositoryContext.Provider
    value={{ scoresRepositoryInstance: options.instance }}
  >
    {options.children}
  </ScoresRepositoryContext.Provider>
);

export default ScoresRepositoryProvider;
