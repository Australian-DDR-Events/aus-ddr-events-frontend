import { ReactNode } from 'react';
import { Result } from 'types/result';
import { Dish, DishSong, GradedDish } from 'types/summer2021';
import { ScoreSubmissionRequest } from '../scores/types';

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

export interface GetSongs {
  (id: string): Promise<Result<Error, Array<DishSong>>>;
}

export interface GetGrades {
  (id: string): Promise<Result<Error, Array<GradedDish>>>;
}

export interface PostSubmission {
  (id: string, dishSubmission: DishSubmissionRequest): Promise<
    Result<Error, DishSubmissionResponse>
  >;
}

export type DishesRepository = {
  getById: GetById;
  getAll: GetAll;
  getSongs: GetSongs;
  getGrades: GetGrades;
  postSubmission: PostSubmission;
};

export interface DishesDao {
  getById: GetById;
  getAll: GetAll;
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
