import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultSong } from './constants';
import { Song, SongsRepositoryContextInterface } from './types';

const initialContext = {
  songsRepositoryInstance: {
    getSongs: async () =>
      err(new Error('songs repository not initialized'), new Array<Song>()),
    getSong: async () =>
      err(new Error('songs repository not initialized'), DefaultSong),
  },
};

const SongsRepositoryContext = createContext<SongsRepositoryContextInterface>(
  initialContext,
);

export default SongsRepositoryContext;
