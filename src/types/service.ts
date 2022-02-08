import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { RefetchOptions } from 'axios-hooks';

interface ServiceGetResponse<T> {
  loading: boolean;
  error: any;
  data?: T;
  refetch?: Function;
}

interface ServicePostResponse {
  loading: boolean;
  error: any;
  execute: (
    config?: AxiosRequestConfig<any> | undefined,
    options?: RefetchOptions | undefined,
  ) => AxiosPromise<any>;
}

export { ServiceGetResponse, ServicePostResponse };
