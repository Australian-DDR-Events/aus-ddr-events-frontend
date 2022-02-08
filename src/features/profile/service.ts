import useSWRGet from 'hooks/use-swr-get';
import { ServiceGetResponse } from 'types/service';

import { DancerResponse } from './types';

const GetUserById = (id: string): ServiceGetResponse<DancerResponse> => {
  const { data, error, mutate } = useSWRGet<DancerResponse>(
    `/dancers/me?id=${id}`,
  );
  return {
    loading: data === undefined && error == undefined,
    error,
    data,
    refetch: mutate,
  };
};

export { GetUserById };