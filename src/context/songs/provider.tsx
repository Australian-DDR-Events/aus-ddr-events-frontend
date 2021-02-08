import React from 'react';
import { SongsRepositoryProviderOptions } from '~/context/songs/types';
import SongsRepositoryContext from './context';

const SongsRepositoryProvider = (options: SongsRepositoryProviderOptions) => (
  <SongsRepositoryContext.Provider
    value={{ songsRepositoryInstance: options.songsRepositoryInstance }}
  >
    {options.children}
  </SongsRepositoryContext.Provider>
);

export default SongsRepositoryProvider;
