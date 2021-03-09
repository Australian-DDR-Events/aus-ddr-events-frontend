import { Event } from 'context/events';
import { ReactNode } from 'react';
import { Result } from 'types/result';

export type Badge = {
  id: string;
  name: string;
  description: string;
  event: Event | null;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
};

export type BadgesRepository = {
  getAll: () => Promise<Result<Error, Array<Badge>>>;
  getById: (id: string) => Promise<Result<Error, Badge>>;
  getForDancerId: (id: string) => Promise<Result<Error, Array<Badge>>>;
  assignBadge: (
    dancerId: string,
    badgeId: string,
  ) => Promise<Result<Error, void>>;
  revokeBadge: (
    dancerId: string,
    badgeId: string,
  ) => Promise<Result<Error, void>>;
};

export interface GetAll {
  (): Promise<Result<Error, Array<Badge>>>;
}

export interface GetById {
  (id: string): Promise<Result<Error, Badge>>;
}

export interface GetForDancerId {
  (id: string): Promise<Result<Error, Array<Badge>>>;
}

export interface AssignBadge {
  (dancerId: string, badgeId: string): Promise<Result<Error, void>>;
}

export interface RevokeBadge {
  (dancerId: string, badgeId: string): Promise<Result<Error, void>>;
}

export interface BadgesDao {
  getAll: GetAll;
  getById: GetById;
  getForDancerId: GetForDancerId;
  assignBadge: AssignBadge;
  revokeBadge: RevokeBadge;
}

export interface BadgesRepositoryContextInterface {
  badgesRepositoryInstance: BadgesRepository;
}

export interface BadgesRepositoryProviderOptions {
  children?: ReactNode;
  instance: BadgesRepository;
}
