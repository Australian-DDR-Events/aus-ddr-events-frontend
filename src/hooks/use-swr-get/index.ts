import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthentication } from 'hooks/use-authentication';
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
): SWRResponse<T> => {
  const { isAuthenticated, getAccessToken } = useAuthentication();

  const getRequestOption = (
    url: string,
    token?: string,
  ): AxiosRequestConfig => ({
    url: `${process.env.API_URL}${url}`,
    method: 'GET',
    ...(token && {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }),
  });

  const fetcher = (url: string, token: string = '') =>
    axios
      .request(getRequestOption(url, token))
      .then((r: AxiosResponse<T>) => r.data)
      .catch((e) => {
        throw e;
      });

  if (isAuthenticated())
    return useSWR([path, getAccessToken()], fetcher, {
      shouldRetryOnError: retry,
    });

  return useSWR(path, fetcher, {
    shouldRetryOnError: retry,
  });
};

export default useSWRGet;
