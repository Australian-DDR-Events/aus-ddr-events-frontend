import axios, { AxiosRequestConfig } from 'axios';
import resizeImage from 'utils/images';

import { ImageSubmissionData } from './types';

interface PostImageRequest {
  data: ImageSubmissionData;
  maxX: number;
  maxY: number;
  url: string;
}

const PostImage = async ({ data, maxX, maxY, url }: PostImageRequest) => {
  const form = new FormData();
  form.append('image', await resizeImage(data.image, maxX, maxY));

  const request: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return axios.post(url, form, request);
};

export { PostImage };
