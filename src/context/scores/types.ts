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

export interface GetScore {
  (id: string): Promise<Result<Error, Score>>;
}

export interface GetScores {
  (request: GetScoresRequest): Promise<Result<Error, Array<Score>>>;
}

export interface PostScore {
  (scoreSubmission: ScoreSubmissionRequest): Promise<Result<Error, boolean>>;
}

export type ScoresRepository = {
  getScore: GetScore;
  getScores: GetScores;
  postScore: PostScore;
};

export interface ScoresDao {
  getScore: GetScore;
  getScores: GetScores;
  postScore: PostScore;
}

export interface ScoresRepositoryContextInterface {
  scoresRepositoryInstance: ScoresRepository;
}

export interface ScoresRepositoryProviderOptions {
  children?: ReactNode;
  scoresRepositoryInstance: ScoresRepository;
}
