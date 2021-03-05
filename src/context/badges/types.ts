import { ReactNode } from 'react';
import { Result } from 'types/result';

export type Badge = {
  id: string;
  name: string;
  description: string;
  eventId: string;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
};

export type BadgesRepository = {
  getById: (id: string) => Promise<Result<Error, Array<Badge>>>;
};

export interface GetById {
  (id: string): Promise<Result<Error, Array<Badge>>>;
}

export interface BadgesDao {
  getById: GetById;
}

export interface BadgesRepositoryContextInterface {
  badgesRepositoryInstance: BadgesRepository;
}

export interface BadgesRepositoryProviderOptions {
  children?: ReactNode;
  instance: BadgesRepository;
}
