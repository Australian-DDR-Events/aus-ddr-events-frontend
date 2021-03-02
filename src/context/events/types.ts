import { ReactNode } from 'react';
import { Result } from 'types/result';

export type Event = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type EventsRepository = {
  getAll: (active_only: boolean) => Promise<Result<Error, Array<Event>>>;
};

export interface GetAll {
  (active_only: boolean): Promise<Result<Error, Array<Event>>>;
}

export interface EventsDao {
  getAll: GetAll;
}

export interface EventsRepositoryContextInterface {
  eventsRepositoryInstance: EventsRepository;
}

export interface EventsRepositoryProviderOptions {
  children?: ReactNode;
  instance: EventsRepository;
}
