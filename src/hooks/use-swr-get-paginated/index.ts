import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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
  const getRequestOption = (url: string): AxiosRequestConfig => ({
    url: `${process.env.API_URL}${url}`,
    method: 'GET',
    params: {
      page: page || 0,
      limit: limit || 10,
    },
    withCredentials: true,
  });

  const fetcher = (url: string) =>
    axios
      .request(getRequestOption(url))
      .then((r: AxiosResponse<T>) => r.data)
      .catch((e) => e);

  return useSWR(path, fetcher);
};

export default useSWRGetPaginated;
