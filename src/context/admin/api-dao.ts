import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { err, ok, Result } from 'types/result';

import { AdminDao } from './types';

const adminApiDao = ({
  getIdTokenFunc,
  axiosClient,
}: {
  getIdTokenFunc: () => Promise<string>;
  axiosClient: AxiosInstance;
}): AdminDao => {
  const uploadImage = async (
    image: File,
    name: string,
    sizes: Array<number>,
  ): Promise<Result<Error, void>> => {
    const data = new FormData();
    data.append('formImage', image);
    data.append('fileName', name);

    const queryString = sizes.map((s) => `image_size=${s}`).join('&');

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    return axiosClient
      .post(`/admin/upload?${queryString}`, data, request)
      .then((): Result<Error, void> => ok(undefined))
      .catch(
        (): Result<Error, void> =>
          err(new Error('failed to post score'), undefined),
      );
  };
  return { uploadImage };
};

export default adminApiDao;
