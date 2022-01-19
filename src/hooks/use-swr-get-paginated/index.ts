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
const useSWRGetPaginated = <T extends unknown>(
  path: string,
  page: Number,
  limit: Number,
): SWRResponse<T> => {
  const { isAuthenticated, getAccessToken } = useAuthentication();

  const getRequestOption = (
    url: string,
    token?: string,
  ): AxiosRequestConfig => ({
    url: `${process.env.API_URL}${url}`,
    method: 'GET',
    params: {
      page: page || 0,
      limit: limit || 10,
    },
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
      .catch((e) => e);

  if (isAuthenticated()) return useSWR([path, getAccessToken()], fetcher);

  return useSWR(path, fetcher);
};

export default useSWRGetPaginated;
