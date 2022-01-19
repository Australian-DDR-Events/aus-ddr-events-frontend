import useSWRGetPaginated from 'hooks/use-swr-get-paginated';

import { Dancer } from './types';

type ListDancersData = [Boolean, Array<Dancer> | undefined];

/**
 * Get a paginated list of dancers
 * @param page
 * @param limit
 */
const useListDancers = (page: Number, limit: Number): ListDancersData => {
  const { data, error } = useSWRGetPaginated<Dancer[]>('/dancers', page, limit);

  if (error) return [false, error];

  return [!data, data];
};

export default useListDancers;
