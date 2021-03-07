import React from 'react';

import BadgesRepositoryContext from './context';
import { BadgesRepositoryProviderOptions } from './types';

const BadgesRepositoryProvider = (options: BadgesRepositoryProviderOptions) => (
  <BadgesRepositoryContext.Provider
    value={{ badgesRepositoryInstance: options.instance }}
  >
    {options.children}
  </BadgesRepositoryContext.Provider>
);

export default BadgesRepositoryProvider;
