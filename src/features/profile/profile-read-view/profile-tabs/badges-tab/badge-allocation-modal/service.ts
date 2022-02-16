import axios from 'axios';
import useSWRGet from 'hooks/use-swr-get';
import { ServiceGetResponse } from 'types/service';

import { BadgeResponse } from './types';

const GetBadges = (): ServiceGetResponse<Array<BadgeResponse>> => {
  const { data, error } = useSWRGet<Array<BadgeResponse>>(`/badges?limit=100`);
  return {
    loading: data === undefined && error == undefined,
    error,
    data,
  };
};

const AssignBadge = (dancerId: string, badgeId: string): Promise<undefined> => {
  return axios.post(`/dancers/${dancerId}/badges/${badgeId}`);
};

const RevokeBadge = (dancerId: string, badgeId: string): Promise<undefined> => {
  return axios.delete(`/dancers/${dancerId}/badges/${badgeId}`);
};

export { AssignBadge, GetBadges, RevokeBadge };
