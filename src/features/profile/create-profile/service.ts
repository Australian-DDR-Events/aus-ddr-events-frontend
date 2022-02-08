import { AxiosRequestConfig } from 'axios';
import useAxios from 'axios-hooks';
import { ServiceGetResponse } from 'types/service';

import { DancerResponse } from './types';

const GetCurrentUser = (): ServiceGetResponse<DancerResponse> => {
  const requestOptions: AxiosRequestConfig = {
    url: '/dancers/me',
    method: 'GET',
  };

  const [{ loading, error, data }] = useAxios<DancerResponse>(requestOptions);

  return {
    loading,
    error,
    data,
  };
};

export { GetCurrentUser };
