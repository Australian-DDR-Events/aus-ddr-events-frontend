import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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

  const requestOptions = {
    ...options,
    baseURL: 'http://localhost:5000',
  };

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
