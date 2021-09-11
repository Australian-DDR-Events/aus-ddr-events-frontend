import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthentication } from 'hooks/use-authentication';
import { useEndpoint } from 'hooks/use-endpoint';
import { useEffect, useState } from 'react';

type UseApiReturn<T> = {
  value?: T;
  loading: boolean;
};

const useApi = <T extends unknown>(
  options: AxiosRequestConfig,
): UseApiReturn<T> => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<T | undefined>(undefined);
  const { url } = useEndpoint();
  const { isAuthenticated, getAccessToken } = useAuthentication();

  let requestOptions = {
    ...options,
    baseURL: url,
  };

  if (isAuthenticated()) {
    requestOptions = {
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      ...requestOptions,
    };
  }

  useEffect(() => {
    axios
      .request(requestOptions)
      .then((r: AxiosResponse<T>) => {
        setValue(r.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return {
    value,
    loading,
  };
};

export default useApi;
