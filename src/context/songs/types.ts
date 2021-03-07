import { ReactNode } from 'react';
import { Song } from 'types/core';
import { Result } from 'types/result';

export type SongsRepository = {
  getAll: () => Promise<Result<Error, Song[]>>;
  getById: (id: string) => Promise<Result<Error, Song>>;
  getByIds: (songIds: string[]) => Promise<Result<Error, Song[]>>;
};

export interface GetAll {
  (): Promise<Result<Error, Song[]>>;
}
export interface GetById {
  (id: string): Promise<Result<Error, Song>>;
}

export interface GetByIds {
  (songIds: string[]): Promise<Result<Error, Song[]>>;
}

export interface SongsDao {
  getAll: GetAll;
  getById: GetById;
  getByIds: GetByIds;
}

export interface SongsRepositoryContextInterface {
  songsRepositoryInstance: SongsRepository;
}

export interface SongsRepositoryProviderOptions {
  children?: ReactNode;
  instance: SongsRepository;
}
