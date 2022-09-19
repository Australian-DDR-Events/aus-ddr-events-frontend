import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useSWR, { SWRResponse } from 'swr';

interface PostParams {
  queryParams?: URLSearchParams;
}

/**
 * Perform a GET request using SWR. This will automatically attach a Auth header
 * if the user is authenticated.
 * @param path
 * @param page
 * @param limit
 * @returns
 */
const useSWRPost = <T extends unknown>(
  path: string,
  params: PostParams,
  retry: boolean = true,
): SWRResponse<T, AxiosError> => {
  const getRequestOption = (url: string): AxiosRequestConfig => {
    const queryString = params.queryParams
      ? new URLSearchParams(params.queryParams).toString()
      : '';
    return {
      url: `${process.env.API_URL}${url}${
        queryString.length > 0 ? `?${queryString}` : ''
      }`,
      method: 'POST',
      withCredentials: true,
    };
  };

  const fetcher = (url: string) =>
    axios.request(getRequestOption(url)).then((r: AxiosResponse<T>) => r.data);

  return useSWR(path, fetcher, {
    shouldRetryOnError: retry,
  });
};

export default useSWRPost;
