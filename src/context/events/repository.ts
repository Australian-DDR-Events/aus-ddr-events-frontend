import { Result } from 'types/result';
import { Event, EventsDao, EventsRepository } from './types';

const eventsRepository = (dao: EventsDao): EventsRepository => {
  const getAll = (active_only: boolean): Promise<Result<Error, Array<Event>>> =>
    dao.getAll(active_only);

  return { getAll };
};

export default eventsRepository;
