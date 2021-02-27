import { ReactNode } from 'react';
import { Result } from 'types/result';

export type Dancer = {
  id: string;
  dancerName: string;
  dancerId: string;
  profilePicture: string;
  newProfilePicture: File;
  userName: string;
  state: string;
  primaryMachine: string;
};

export type DancersRepository = {
  get: (id: string) => Promise<Result<Error, Dancer>>;
  update: (user: Dancer) => Promise<Result<Error, boolean>>;
};

export interface Get {
  (id: string): Promise<Result<Error, Dancer>>;
}

export interface Update {
  (user: Dancer): Promise<Result<Error, boolean>>;
}

export interface DancersDao {
  get: Get;
  update: Update;
}

export interface DancersRepositoryContextInterface {
  dancersRepositoryInstance: DancersRepository;
}

export interface DancersRepositoryProviderOptions {
  children?: ReactNode;
  instance: DancersRepository;
}
