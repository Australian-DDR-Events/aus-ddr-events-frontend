import { ReactNode } from 'react';
import { Result } from 'types/result';
import { Song } from 'types/core';

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
