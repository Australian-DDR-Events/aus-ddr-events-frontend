import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthentication } from 'hooks/use-authentication';
import { useEndpoint } from 'hooks/use-endpoint';
import { useEffect, useState } from 'react';

type UseApiReturn<T> = {
  value?: T;
  error?: any;
  loading: boolean;
};

const useApi = <T extends unknown>(
  options: AxiosRequestConfig,
  data: any,
): UseApiReturn<T> => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<T | undefined>(undefined);
  const [error, setError] = useState<any>(undefined);

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
      .request({
        ...requestOptions,
        data: data,
      })
      .then((r: AxiosResponse<T>) => {
        setValue(r.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    value,
    loading,
    error,
  };
};

export default useApi;
