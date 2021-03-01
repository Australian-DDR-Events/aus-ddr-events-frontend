import { ReactNode } from 'react';
import { Result } from 'types/result';
import { Ingredient } from '../ingredients/types';
import { ScoreSubmissionRequest } from '../scores/types';

export type Dish = {
  id: string;
  name: string;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
};

export type DishGrade = {
  id: string;
  description: string;
  grade: string;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
};

export type DishSong = {
  id: string;
  cookingOrder: number;
  cookingMethod: string;
  songId: string;
}

export type DishSubmissionRequest = {
  pairBonus: boolean;
  scores: Array<ScoreSubmissionRequest>;
  finalImage: File;
};

export type DishSubmissionResponse = {
  id: string;
  gradedDishId: string;
  dancerId: string;
};

export interface GetById {
  (id: string): Promise<Result<Error, Dish>>;
}

export interface GetAll {
  (): Promise<Result<Error, Array<Dish>>>;
}

export interface GetIngredients {
  (id: string): Promise<Result<Error, Array<Ingredient>>>;
}

export interface GetSongs {
  (id: string): Promise<Result<Error, Array<DishSong>>>;
}

export interface GetGrades {
  (id: string): Promise<Result<Error, Array<DishGrade>>>;
}

export interface PostSubmission {
  (id: string, dishSubmission: DishSubmissionRequest): Promise<
    Result<Error, DishSubmissionResponse>
  >;
}

export type DishesRepository = {
  getById: GetById;
  getAll: GetAll;
  getIngredients: GetIngredients;
  getSongs: GetSongs;
  getGrades: GetGrades;
  postSubmission: PostSubmission;
};

export interface DishesDao {
  getById: GetById;
  getAll: GetAll;
  getIngredients: GetIngredients;
  getSongs: GetSongs;
  getGrades: GetGrades;
  postSubmission: PostSubmission;
}

export interface DishesRepositoryContextInterface {
  dishesRepositoryInstance: DishesRepository;
}

export interface DishesRepositoryProviderOptions {
  children?: ReactNode;
  instance: DishesRepository;
}
