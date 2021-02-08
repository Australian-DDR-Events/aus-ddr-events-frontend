import { ReactNode } from 'react';
import { Result } from 'types/result';

export type Song = {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  difficulty: string;
  level: number;
};

export type SongsRepository = {
  getSongs: () => Promise<Result<Error, Array<Song>>>;
  getSong: (id: string) => Promise<Result<Error, Song>>;
};

export interface GetSongs {
  (): Promise<Result<Error, Array<Song>>>;
}
export interface GetSong {
  (id: string): Promise<Result<Error, Song>>;
}

export interface SongsDao {
  getSongs: GetSongs;
  getSong: GetSong;
}

export interface SongsRepositoryContextInterface {
  songsRepositoryInstance: SongsRepository;
}

export interface SongsRepositoryProviderOptions {
  children?: ReactNode;
  songsRepositoryInstance: SongsRepository;
}
