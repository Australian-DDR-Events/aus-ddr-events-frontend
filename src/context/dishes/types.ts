import { ReactNode } from 'react';
import { Result } from 'types/result';
import { Dish, DishSong, GradedDish } from 'types/summer2021';

import { Score } from '../../types/core';
import { ScoreSubmissionRequest } from '../scores/types';

export type DishSubmissionRequest = {
  pairBonus: boolean;
  scores: Array<ScoreSubmissionRequest>;
  finalImage: File;
};

export type DishSubmissionResponse = {
  id: string;
  gradedDish: GradedDish;
  dancerId: string;
  resultImage: string;
  scores: Array<Score>;
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
  (
    id: string,
    dishSubmission: DishSubmissionRequest,
    onUploadProgress: any,
  ): Promise<Result<Error, DishSubmissionResponse>>;
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
