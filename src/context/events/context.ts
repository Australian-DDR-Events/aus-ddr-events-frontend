import { createContext } from 'react';
import { err } from 'types/result';
import { Event, EventsRepositoryContextInterface } from './types';

const initialContext = {
  eventsRepositoryInstance: {
    getAll: async () =>
      err(new Error('events repository not initialized'), new Array<Event>()),
  },
};

const EventsRepositoryContext = createContext<EventsRepositoryContextInterface>(
  initialContext,
);

export default EventsRepositoryContext;
