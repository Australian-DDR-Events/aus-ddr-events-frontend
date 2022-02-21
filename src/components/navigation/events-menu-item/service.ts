import useSWRGet from 'hooks/use-swr-get';
import { ServiceGetResponse } from 'types/service';

import { EventResponse } from './types';

const GetEvents = (): ServiceGetResponse<Array<EventResponse>> => {
  const { data, error, mutate } = useSWRGet<Array<EventResponse>>('/events');

  return {
    loading: data === undefined,
    data: data?.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    ),
    error,
    refetch: mutate,
  };
};

export { GetEvents };
