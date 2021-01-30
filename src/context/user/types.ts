import { ReactNode } from 'react';
import { Result } from 'types/result';

export type User = {
  dancerName: string;
  dancerId: string;
  profilePicture: string;
  userName: string;
  state: string;
  primaryMachine: string;
};

export type UserRepository = {
  get: (id: string) => Promise<Result<Error, User>>;
  update: (user: User) => Promise<Result<Error, boolean>>;
};

export interface Get {
  (id: string): Promise<Result<Error, User>>;
}

export interface Update {
  (user: User): Promise<Result<Error, boolean>>;
}

export interface UserDao {
  get: Get;
  update: Update;
}

export interface UserRepositoryContextInterface {
  userRepositoryInstance: UserRepository;
}

export interface UserRepositoryProviderOptions {
  children?: ReactNode;
  userRepositoryInstance: UserRepository;
}
