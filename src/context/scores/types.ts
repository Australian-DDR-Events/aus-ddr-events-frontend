import { ReactNode } from 'react';
import { Result } from 'types/result';

export type ScoreSubmissionRequest = {
  score: number;
  scoreImage: File;
  songId: string;
};

export type Summer2021SubmissionRequest = {
  scoreRequest: ScoreSubmissionRequest;
  ingredientId: string;
};

export type GetScoresRequest = {
  songId?: string[];
  dancerId?: string[];
};

export type GetSummer2021Request = {
  ingredientId?: string;
  dancerId?: string;
};

export type Score = {
  id: string;
  value: number;
  submissionTime: string;
  imageUrl: string;
  dancerId: string;
  songId: string;
};

export type Summer2021Score = {
  id: string;
  gradedIngredientId: string;
  dancerId: string;
  scoreId: string;
};

export interface GetById {
  (id: string): Promise<Result<Error, Score>>;
}

export interface GetAll {
  (request: GetScoresRequest): Promise<Result<Error, Array<Score>>>;
}

export interface PostScore {
  (scoreSubmission: ScoreSubmissionRequest): Promise<Result<Error, boolean>>;
}

export interface GetSummer2021ByDancer {
  (id: string): Promise<Result<Error, Array<Summer2021Score>>>;
}

export interface GetSummer2021 {
  (request: GetSummer2021Request): Promise<Result<Error, Summer2021Score>>;
}

export interface PostSummer2021 {
  (scoreSubmission: Summer2021SubmissionRequest): Promise<
    Result<Error, Summer2021Score>
  >;
}

export type ScoresRepository = {
  getById: GetById;
  getAll: GetAll;
  postScore: PostScore;
  getSummer2021ByDancer: GetSummer2021ByDancer;
  getSummer2021: GetSummer2021;
  postSummer2021: PostSummer2021;
};

export interface ScoresDao {
  getById: GetById;
  getAll: GetAll;
  postScore: PostScore;
  getSummer2021ByDancer: GetSummer2021ByDancer;
  getSummer2021: GetSummer2021;
  postSummer2021: PostSummer2021;
}

export interface ScoresRepositoryContextInterface {
  scoresRepositoryInstance: ScoresRepository;
}

export interface ScoresRepositoryProviderOptions {
  children?: ReactNode;
  instance: ScoresRepository;
}
