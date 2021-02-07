import { ReactNode } from 'react';
import { Result } from 'types/result';

export type User = {
  id: string;
  dancerName: string;
  dancerId: string;
  profilePicture: string;
  newProfilePicture: File;
  userName: string;
  state: string;
  primaryMachine: string;
};

export type Song = {
  id: string;
  name: string;
  artist: string;
  jacketUrl: string;
  difficulty: string;
  level: number;
};

export type ScoreSubmissionRequest = {
  score: number;
  scoreImage: File;
  songId: string;
};

export type Score = {
  id: string;
};

export type UserRepository = {
  get: (id: string) => Promise<Result<Error, User>>;
  update: (user: User) => Promise<Result<Error, boolean>>;
  submitScore: (
    scoreSubmission: ScoreSubmissionRequest,
  ) => Promise<Result<Error, boolean>>;
};

export interface Get {
  (id: string): Promise<Result<Error, User>>;
}

export interface Update {
  (user: User): Promise<Result<Error, boolean>>;
}

export interface SubmitScore {
  (scoreSubmission: ScoreSubmissionRequest): Promise<Result<Error, boolean>>;
}

export interface UserDao {
  get: Get;
  update: Update;
  submitScore: SubmitScore;
}

export interface UserRepositoryContextInterface {
  userRepositoryInstance: UserRepository;
}

export interface UserRepositoryProviderOptions {
  children?: ReactNode;
  userRepositoryInstance: UserRepository;
}
