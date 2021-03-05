import { ReactNode } from 'react';
import { Result } from 'types/result';
import { Summer2021Score } from '../scores/types';

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
  image32: string;
  image64: string;
  image128: string;
  image256: string;
};

export type ScoreSubmissionRequest = {
  score: number;
  scoreImage: File;
};

export type IngredientsRepository = {
  getAll: () => Promise<Result<Error, Array<Ingredient>>>;
  getById: (id: string) => Promise<Result<Error, Ingredient>>;
  getGrades: (id: string) => Promise<Result<Error, Array<IngredientGrade>>>;
  postScoreSubmission: (
    id: string,
    submission: ScoreSubmissionRequest,
  ) => Promise<Result<Error, Summer2021Score>>;
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

export interface PostScoreSubmission {
  (id: string, submission: ScoreSubmissionRequest): Promise<
    Result<Error, Summer2021Score>
  >;
}

export interface IngredientsDao {
  getAll: GetAll;
  getById: GetById;
  getGrades: GetGrades;
  postScoreSubmission: PostScoreSubmission;
}

export interface IngredientsRepositoryContextInterface {
  ingredientsRepositoryInstance: IngredientsRepository;
}

export interface IngredientsRepositoryProviderOptions {
  children?: ReactNode;
  instance: IngredientsRepository;
}
