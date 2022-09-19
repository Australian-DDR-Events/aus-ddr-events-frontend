import useSWRGet from 'hooks/use-swr-get';
import { ServiceGetResponse } from 'types/service';

import { SongResponse } from './types';

const GetSongById = (id: string): ServiceGetResponse<SongResponse> => {
  const { data, error, mutate } = useSWRGet<SongResponse>(`/songs/${id}`);
  return {
    loading: data === undefined && error == undefined,
    error,
    data,
    refetch: mutate,
  };
};

export { GetSongById };
