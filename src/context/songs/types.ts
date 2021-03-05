import { ReactNode } from 'react';
import { Result } from 'types/result';

export type Song = {
  id: string;
  name: string;
  artist: string;
  difficulty: string;
  level: number;
  maxScore: number;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
  image512: string;
};

export type SongsRepository = {
  getAll: () => Promise<Result<Error, Array<Song>>>;
  getById: (id: string) => Promise<Result<Error, Song>>;
};

export interface GetAll {
  (): Promise<Result<Error, Array<Song>>>;
}
export interface GetById {
  (id: string): Promise<Result<Error, Song>>;
}

export interface SongsDao {
  getAll: GetAll;
  getById: GetById;
}

export interface SongsRepositoryContextInterface {
  songsRepositoryInstance: SongsRepository;
}

export interface SongsRepositoryProviderOptions {
  children?: ReactNode;
  instance: SongsRepository;
}
