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

export type AllDancers = {
  id: string;
  authenticationId: string;
  ddrName: string;
  ddrCode: string;
  primaryMachineLocation: string;
  profilePictureUrl: string;
  state: string;
};

export type DancersRepository = {
  getAll: () => Promise<Result<Error, Array<AllDancers>>>;
  get: (id: string) => Promise<Result<Error, Dancer>>;
  update: (user: Dancer) => Promise<Result<Error, boolean>>;
};

export interface GetAll {
  (): Promise<Result<Error, Array<AllDancers>>>;
}

export interface Get {
  (id: string): Promise<Result<Error, Dancer>>;
}

export interface Update {
  (user: Dancer): Promise<Result<Error, boolean>>;
}

export interface DancersDao {
  getAll: GetAll;
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
