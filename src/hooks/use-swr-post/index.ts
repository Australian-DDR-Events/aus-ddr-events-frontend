import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthentication } from 'hooks/use-authentication';
import useSWR, { SWRResponse } from 'swr';

/**
 * Perform a POST request using SWR.
 * This will automatically attach a Auth header
 * if the user is authenticated.
 * @param path
 * @param body
 * @returns
 */
const useSWRPost = <T1 extends unknown, T2 extends unknown>(
  path: string,
  body: T1,
): SWRResponse<T2 | undefined> => {
  const { isAuthenticated, getAccessToken } = useAuthentication();

  const postRequestOptions = (
    url: string,
    token?: string,
  ): AxiosRequestConfig => ({
    url: `${process.env.API_URL}${url}`,
    method: 'POST',
    data: body,
    ...(token && {
      headers: {
        authorization: `${
          process.env.AUTH_PROVIDER === 'local' ? 'basic' : 'bearer'
        } ${token}`,
      },
    }),
  });

  const fetcher = (url: string, token: string = '') =>
    axios
      .request(postRequestOptions(url, token))
      .then((r: AxiosResponse<T2>) => r.data)
      .catch((e) => e);

  if (isAuthenticated()) return useSWR([path, getAccessToken()], fetcher);

  return useSWR(path, fetcher);
};

export default useSWRPost;
