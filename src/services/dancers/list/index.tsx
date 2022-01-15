import useSWRGet from 'hooks/use-swr-get';

import { Dancer } from './types';

type ListDancersData = [Boolean, Array<Dancer> | undefined];

/**
 * Get a paginated list of dancers
 * @param page
 * @param limit
 */
const useListDancers = (page: Number, limit: Number): ListDancersData => {
  const { data, error } = useSWRGet<Dancer[]>('/dancers', page, limit);

  if (error) return [false, error];

  return [!data, data];
};

export default useListDancers;
