import React from 'react';
import DancersRepositoryContext from './context';
import { DancersRepositoryProviderOptions } from './types';

const DancersRepositoryProvider = (
  options: DancersRepositoryProviderOptions,
) => (
  <DancersRepositoryContext.Provider
    value={{ dancersRepositoryInstance: options.dancersRepositoryInstance }}
  >
    {options.children}
  </DancersRepositoryContext.Provider>
);

export default DancersRepositoryProvider;
