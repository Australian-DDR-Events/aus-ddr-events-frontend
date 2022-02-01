import useSWRGetPaginated from 'hooks/use-swr-get-paginated';
import { ApiResponse, HookResponse } from 'types/api';

import { Song } from './types';

type ListSongResponse = HookResponse<Song[]>;

/**
 * Get a paginated list of dancers
 * @param page
 * @param limit
 */
const useListSongs = (page: Number, limit: Number): ListSongResponse => {
  const { data, error } = useSWRGetPaginated<ApiResponse<Song[]>>(
    '/songs',
    page,
    limit,
  );

  if (data)
    return {
      type: 'success',
      value: data.value,
    };

  if (error)
    return {
      type: 'error',
      error,
    };

  return {
    type: 'loading',
  };
};

export default useListSongs;
