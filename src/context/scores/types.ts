import { ReactNode } from 'react';
import { Result } from 'types/result';

export type ScoreSubmissionRequest = {
  score: number;
  scoreImage: File;
  songId: string;
};

export type GetScoresRequest = {
  songId?: string;
  dancerId?: string;
};

export type Score = {
  id: string;
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

export type ScoresRepository = {
  getById: GetById;
  getAll: GetAll;
  postScore: PostScore;
};

export interface ScoresDao {
  getById: GetById;
  getAll: GetAll;
  postScore: PostScore;
}

export interface ScoresRepositoryContextInterface {
  scoresRepositoryInstance: ScoresRepository;
}

export interface ScoresRepositoryProviderOptions {
  children?: ReactNode;
  instance: ScoresRepository;
}
