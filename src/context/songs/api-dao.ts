import { AxiosInstance, AxiosResponse } from 'axios';
import { Song } from 'types/core';
import { err, ok, Result } from 'types/result';

import { DefaultSong } from './constants';
import { SongsDao } from './types';

const songsApiDao = ({
  axiosClient,
}: {
  axiosClient: AxiosInstance;
}): SongsDao => {
  const getAll = async (): Promise<Result<Error, Song[]>> => {
    return axiosClient
      .get(`/songs`)
      .then((response: AxiosResponse): Song[] => {
        return response.data.map((song: Song): Song => song);
      })
      .then((songs: Song[]): Result<Error, Song[]> => ok(songs))
      .catch((): Result<Error, Song[]> => {
        return err(new Error('failed to get songs'), new Array<Song>());
      });
  };

  const getByIds = async (
    songIds: string[],
  ): Promise<Result<Error, Song[]>> => {
    return axiosClient
      .get(`/songs?${songIds.map((s) => `song_id=${s}`).join('&')}`)
      .then((response: AxiosResponse): Song[] => {
        return response.data.map((song: Song): Song => song);
      })
      .then((songs: Song[]): Result<Error, Song[]> => ok(songs))
      .catch((): Result<Error, Song[]> => {
        return err(new Error('failed to get songs'), new Array<Song>());
      });
  };

  const getById = async (id: string): Promise<Result<Error, Song>> => {
    return axiosClient
      .get(`/songs/${id}`)
      .then(
        (response: AxiosResponse<Song>): Result<Error, Song> =>
          ok(response.data),
      )
      .catch((): Result<Error, Song> => {
        return err(new Error('failed to get songs'), DefaultSong);
      });
  };

  return { getAll, getById, getByIds };
};

export default songsApiDao;
