import { ReactNode } from 'react';
import { Result } from 'types/result';
import { Song } from '../songs/types';

export type Ingredient = {
  id: string;
  name: string;
  song: Song;
};

export type IngredientsRepository = {
  getAll: () => Promise<Result<Error, Array<Ingredient>>>;
  getById: (id: string) => Promise<Result<Error, Ingredient>>;
};

export interface GetAll {
  (): Promise<Result<Error, Array<Ingredient>>>;
}

export interface GetById {
  (id: string): Promise<Result<Error, Ingredient>>;
}

export interface IngredientsDao {
  getAll: GetAll;
  getById: GetById;
}

export interface IngredientsRepositoryContextInterface {
  ingredientsRepositoryInstance: IngredientsRepository;
}

export interface IngredientsRepositoryProviderOptions {
  children?: ReactNode;
  ingredientsRepositoryInstance: IngredientsRepository;
}
