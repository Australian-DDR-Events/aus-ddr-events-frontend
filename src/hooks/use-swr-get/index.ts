import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useSWR, { SWRResponse } from 'swr';

/**
 * Perform a GET request using SWR. This will automatically attach a Auth header
 * if the user is authenticated.
 * @param path
 * @param page
 * @param limit
 * @returns
 */
const useSWRGet = <T extends unknown>(
  path: string,
  retry: boolean = true,
): SWRResponse<T, AxiosError> => {
  const getRequestOption = (url: string): AxiosRequestConfig => ({
    url: `${process.env.API_URL}${url}`,
    method: 'GET',
    withCredentials: true,
  });

  const fetcher = (url: string) =>
    axios.request(getRequestOption(url)).then((r: AxiosResponse<T>) => r.data);

  return useSWR(path, fetcher, {
    shouldRetryOnError: retry,
    revalidateOnFocus: false,
  });
};

export default useSWRGet;
