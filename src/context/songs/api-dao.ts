import { err, ok, Result } from 'types/result';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Song, SongsDao } from './types';
import { DefaultSong } from './constants';

const songsApiDao = ({
  getIdTokenFunc,
  baseApiUrl,
}: {
  getIdTokenFunc: () => Promise<string>;
  baseApiUrl: string;
}): SongsDao => {
  const axiosClient = axios.create({
    baseURL: baseApiUrl,
    timeout: 6000,
  });

  const getSongs = async (): Promise<Result<Error, Array<Song>>> => {
    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
      },
    };

    return axiosClient
      .get(`/songs`, request)
      .then(
        (response: AxiosResponse): Array<Song> => {
          return response.data.map((song: Song): Song => song);
        },
      )
      .then((songs: Array<Song>): Result<Error, Array<Song>> => ok(songs))
      .catch(
        (): Result<Error, Array<Song>> => {
          return err(new Error('failed to get songs'), new Array<Song>());
        },
      );
  };

  const getSong = async (id: string): Promise<Result<Error, Song>> => {
    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
      },
    };

    return axiosClient
      .get(`/songs/${id}`, request)
      .then(
        (response: AxiosResponse<Song>): Result<Error, Song> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Song> => {
          return err(new Error('failed to get songs'), DefaultSong);
        },
      );
  };

  return { getSongs, getSong };
};

export default songsApiDao;
