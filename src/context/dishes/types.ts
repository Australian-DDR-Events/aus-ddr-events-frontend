import { ReactNode } from 'react';
import { Result } from 'types/result';
import { ScoreSubmissionRequest } from '../scores/types';

export type Dish = {
  id: string;
  name: string;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
}

export type DishGrade = {
  id: string;
  description: string;
  grade: string;
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
}

export interface GetById {
  (id: string): Promise<Result<Error, Dish>>;
}

export interface GetAll {
  (): Promise<Result<Error, Array<Dish>>>;
}

export interface GetGrades {
  (id: string): Promise<Result<Error, Array<DishGrade>>>;
}

export interface PostSubmission {
  (id: string, dishSubmission: DishSubmissionRequest): Promise<Result<Error, DishSubmissionResponse>>;
}

export type DishesRepository = {
  getById: GetById;
  getAll: GetAll;
  getGrades: GetGrades;
  postSubmission: PostSubmission;
};

export interface DishesDao {
  getById: GetById;
  getAll: GetAll;
  getGrades: GetGrades;
  postSubmission: PostSubmission;
}

export interface DishesRepositoryContextInterface {
  dishesRepositoryInstance: DishesRepository;
}

export interface DishesRepositoryProviderOptions {
  children?: ReactNode;
  dishesRepositoryInstance: DishesRepository;
}
