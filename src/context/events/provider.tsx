import React from 'react';

import EventsRepositoryContext from './context';
import { EventsRepositoryProviderOptions } from './types';

const EventsRepositoryProvider = (options: EventsRepositoryProviderOptions) => (
  <EventsRepositoryContext.Provider
    value={{ eventsRepositoryInstance: options.instance }}
  >
    {options.children}
  </EventsRepositoryContext.Provider>
);

export default EventsRepositoryProvider;
