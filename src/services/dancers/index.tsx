import useSWRGet from 'hooks/use-swr-get';
import useSWRGetPaginated from 'hooks/use-swr-get-paginated';

import { Dancer } from './types';

type ActiveProfileData = [
  loading: boolean,
  authorized: boolean,
  refresh: () => void,
  user?: Dancer,
];

const useActiveProfile = (): ActiveProfileData => {
  const { data, error, isValidating, mutate } = useSWRGet<Dancer>(
    '/dancers/me',
    false,
  );
  const authorized = error?.response?.status !== 401;
  const refresh = () => mutate();
  return [isValidating, authorized, refresh, data];
};

type ListDancersData = [boolean, Array<Dancer> | undefined];

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

export { Dancer, useActiveProfile, useListDancers };
