import { ReactNode } from 'react';
import { Result } from 'types/result';

export type Dancer = {
  id: string;
  ddrName: string;
  ddrCode: string;
  profilePictureUrl: string;
  newProfilePicture: File;
  state: string;
  primaryMachine: string;
};

export type DancersRepository = {
  get: (id: string) => Promise<Result<Error, Dancer>>;
  getByAuthenticationId: (
    authenticationId: string,
  ) => Promise<Result<Error, Dancer>>;
  create: (dancer: Dancer) => Promise<Result<Error, boolean>>;
  update: (dancer: Dancer) => Promise<Result<Error, boolean>>;
};

export interface Get {
  (id: string): Promise<Result<Error, Dancer>>;
}

export interface Create {
  (dancer: Dancer): Promise<Result<Error, boolean>>;
}

export interface Update {
  (dancer: Dancer): Promise<Result<Error, boolean>>;
}

export interface DancersDao {
  get: Get;
  getByAuthenticationId: Get;
  create: Create;
  update: Update;
}

export interface DancersRepositoryContextInterface {
  dancersRepositoryInstance: DancersRepository;
}

export interface DancersRepositoryProviderOptions {
  children?: ReactNode;
  instance: DancersRepository;
}
