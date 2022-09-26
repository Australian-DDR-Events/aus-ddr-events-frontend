import useSWRGet from 'hooks/use-swr-get';

import { GameEvent } from './types';

type ListEventsData = [boolean, Array<GameEvent> | undefined, Function];

const useEvents = (): ListEventsData => {
  const { data, mutate } = useSWRGet<Array<GameEvent>>('/events');

  return [
    data === undefined,
    data?.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    ),
    mutate,
  ];
};

export { useEvents };
