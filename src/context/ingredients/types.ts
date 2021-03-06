import { ReactNode } from 'react';
import { Result } from 'types/result';
import {
  DancerGradedIngredient,
  GradedIngredient,
  Ingredient,
  Summer2021Score,
} from 'types/summer2021';

export type ScoreSubmissionRequest = {
  score: number;
  scoreImage: File;
};

export type IngredientsRepository = {
  getAll: () => Promise<Result<Error, Array<Ingredient>>>;
  getById: (id: string) => Promise<Result<Error, Ingredient>>;
  getGrades: (id: string) => Promise<Result<Error, Array<GradedIngredient>>>;
  getGradedIngredientsByDancer: (
    dancerId: string,
    topOnly: boolean,
  ) => Promise<Result<Error, Array<DancerGradedIngredient>>>;
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
  (id: string): Promise<Result<Error, Array<GradedIngredient>>>;
}

export interface PostScoreSubmission {
  (id: string, submission: ScoreSubmissionRequest): Promise<
    Result<Error, Summer2021Score>
  >;
}

export interface GetGradedIngredientsByDancer {
  (dancerId: string, topOnly: boolean): Promise<
    Result<Error, Array<DancerGradedIngredient>>
  >;
}

export interface IngredientsDao {
  getAll: GetAll;
  getById: GetById;
  getGrades: GetGrades;
  postScoreSubmission: PostScoreSubmission;
  getGradedIngredientsByDancer: GetGradedIngredientsByDancer;
}

export interface IngredientsRepositoryContextInterface {
  ingredientsRepositoryInstance: IngredientsRepository;
}

export interface IngredientsRepositoryProviderOptions {
  children?: ReactNode;
  instance: IngredientsRepository;
}
