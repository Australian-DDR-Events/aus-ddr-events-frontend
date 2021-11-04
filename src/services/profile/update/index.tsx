import { AxiosRequestConfig } from 'axios';
import useApi from 'hooks/use-api';

import { UpdateProfileRequest } from './types';

type UpdateProfileData = [Boolean];

const useUpdateProfile = (request: UpdateProfileRequest): UpdateProfileData => {
  const requestOptions: AxiosRequestConfig = {
    url: '/profile',
    method: 'POST',
    data: {
      nickname: request.nickname,
    },
  };

  const { loading } = useApi<undefined>(requestOptions);

  return [loading];
};

export default useUpdateProfile;
