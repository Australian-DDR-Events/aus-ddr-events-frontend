import { ReactNode } from 'react';
import { Result } from 'types/result';

export type Ingredient = {
  id: string;
  name: string;
  songId: string;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
};

export type IngredientGrade = {
  id: string;
  grade: string;
  requiredScore: number;
  description: string;
};

export type IngredientsRepository = {
  getAll: () => Promise<Result<Error, Array<Ingredient>>>;
  getById: (id: string) => Promise<Result<Error, Ingredient>>;
  getGrades: (id: string) => Promise<Result<Error, Array<IngredientGrade>>>;
};

export interface GetAll {
  (): Promise<Result<Error, Array<Ingredient>>>;
}

export interface GetById {
  (id: string): Promise<Result<Error, Ingredient>>;
}

export interface GetGrades {
  (id: string): Promise<Result<Error, Array<IngredientGrade>>>;
}

export interface IngredientsDao {
  getAll: GetAll;
  getById: GetById;
  getGrades: GetGrades;
}

export interface IngredientsRepositoryContextInterface {
  ingredientsRepositoryInstance: IngredientsRepository;
}

export interface IngredientsRepositoryProviderOptions {
  children?: ReactNode;
  ingredientsRepositoryInstance: IngredientsRepository;
}
