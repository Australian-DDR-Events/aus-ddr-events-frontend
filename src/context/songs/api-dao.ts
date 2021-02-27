import { err, ok, Result } from 'types/result';
import { AxiosInstance, AxiosResponse } from 'axios';
import { Song, SongsDao } from './types';
import { DefaultSong } from './constants';

const songsApiDao = ({
  axiosClient,
}: {
  axiosClient: AxiosInstance;
}): SongsDao => {
  const getAll = async (): Promise<Result<Error, Array<Song>>> => {
    return axiosClient
      .get(`/songs`)
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

  const getById = async (id: string): Promise<Result<Error, Song>> => {
    return axiosClient
      .get(`/songs/${id}`)
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

  return { getAll, getById };
};

export default songsApiDao;
