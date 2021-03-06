import { err, ok, Result } from 'types/result';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Score } from 'types/core';
import { Summer2021Score } from 'types/summer2021';
import {
  GetScoresRequest,
  GetSummer2021Request,
  ScoresDao,
  ScoreSubmissionRequest,
} from './types';
import { DefaultScore, DefaultSummer2021Score } from './constants';

const scoresApiDao = ({
  getIdTokenFunc,
  axiosClient,
}: {
  getIdTokenFunc: () => Promise<string>;
  axiosClient: AxiosInstance;
}): ScoresDao => {
  const getById = async (id: string): Promise<Result<Error, Score>> => {
    return axiosClient
      .get(`/scores/${id}`)
      .then(
        (response: AxiosResponse<Score>): Result<Error, Score> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Score> => {
          return err(new Error('failed to get songs'), DefaultScore);
        },
      );
  };

  const getAll = async (
    request: GetScoresRequest,
  ): Promise<Result<Error, Array<Score>>> => {
    const params: string[] = [];
    request.dancerId?.forEach((dancerId) => {
      params.push(`dancer_id=${dancerId}`);
    });
    request.songId?.forEach((songId) => {
      params.push(`song_id=${songId}`);
    });

    return axiosClient
      .get(`/scores?${params.join('&')}`)
      .then(
        (response: AxiosResponse<Array<Score>>): Result<Error, Array<Score>> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Array<Score>> =>
          err(new Error(''), new Array<Score>()),
      );
  };

  const postScore = async (
    submission: ScoreSubmissionRequest,
  ): Promise<Result<Error, boolean>> => {
    const data = new FormData();
    data.append('score', `${submission.score}`);
    data.append('scoreImage', submission.scoreImage);
    data.append('songId', submission.songId);

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    return axiosClient
      .post(`/scores/submit`, data, request)
      .then((): Result<Error, boolean> => ok(true))
      .catch(
        (): Result<Error, boolean> =>
          err(new Error('failed to post score'), false),
      );
  };

  const getSummer2021 = async (
    request: GetSummer2021Request,
  ): Promise<Result<Error, Summer2021Score>> => {
    const axiosRequest: AxiosRequestConfig = {
      params: {
        dancer_id: request.dancerId,
        ingredient_id: request.ingredientId,
      },
    };

    return axiosClient
      .get(`/summer2021/scores`, axiosRequest)
      .then(
        (
          response: AxiosResponse<Summer2021Score>,
        ): Result<Error, Summer2021Score> => ok(response.data),
      )
      .catch(
        (): Result<Error, Summer2021Score> =>
          err(new Error(''), DefaultSummer2021Score),
      );
  };

  return {
    getById,
    getAll,
    postScore,
    getSummer2021,
  };
};

export default scoresApiDao;
