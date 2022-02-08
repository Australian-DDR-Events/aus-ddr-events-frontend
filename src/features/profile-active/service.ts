import useSWRGet from 'hooks/use-swr-get';
import { ServiceGetResponse } from 'types/service';

import { DancerResponse } from './types';

const GetCurrentUser = (): ServiceGetResponse<DancerResponse> => {
  const { data, error } = useSWRGet<DancerResponse>('/dancers/me');
  return {
    loading: data === undefined && error == undefined,
    error,
    data,
  };
};

export { GetCurrentUser };
