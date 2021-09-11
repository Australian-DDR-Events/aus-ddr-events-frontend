import { AxiosRequestConfig } from 'axios';
import useApi from 'hooks/use-api';

type UpdateProfileData = [Boolean];

const useUpdateProfile = (nickname: string): UpdateProfileData => {
  const requestOptions: AxiosRequestConfig = {
    url: '/profile',
    method: 'POST',
    data: {
      nickname,
    },
  };

  const { loading } = useApi<undefined>(requestOptions);

  return [loading];
};

export default useUpdateProfile;
