import { createContext } from 'react';
import { Song } from 'types/core';
import { err } from 'types/result';

import { DefaultSong } from './constants';
import { SongsRepositoryContextInterface } from './types';

const initialContext = {
  songsRepositoryInstance: {
    getAll: async () =>
      err(new Error('songs repository not initialized'), new Array<Song>()),
    getById: async () =>
      err(new Error('songs repository not initialized'), DefaultSong),
    getByIds: async () =>
      err(new Error('songs repository not initialized'), new Array<Song>()),
  },
};

const SongsRepositoryContext = createContext<SongsRepositoryContextInterface>(
  initialContext,
);

export default SongsRepositoryContext;
