import useSWRGet from 'hooks/use-swr-get';
import { ServiceGetResponse } from 'types/service';

import { BadgeResponse } from './types';

const GetBadgesForDancerById = (
  id: string,
): ServiceGetResponse<Array<BadgeResponse>> => {
  const { data, error, mutate } = useSWRGet<Array<BadgeResponse>>(
    `/dancers/${id}/badges`,
  );
  return {
    loading: data === undefined && error == undefined,
    error,
    data,
    refetch: mutate,
  };
};

export { GetBadgesForDancerById };
