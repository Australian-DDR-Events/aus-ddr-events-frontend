import { err, ok, Result } from 'types/result';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  GetScoresRequest,
  Score,
  ScoresDao,
  ScoreSubmissionRequest,
} from './types';
import { DefaultScore } from './constants';

const scoresApiDao = ({
  getIdTokenFunc,
  baseApiUrl,
}: {
  getIdTokenFunc: () => Promise<string>;
  baseApiUrl: string;
}): ScoresDao => {
  const axiosClient = axios.create({
    baseURL: baseApiUrl,
    timeout: 6000,
  });

  const getById = async (id: string): Promise<Result<Error, Score>> => {
    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
      },
    };

    return axiosClient
      .get(`/scores/${id}`, request)
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
    const axiosRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
      },
      params: {
        dancer_id: request.dancerId,
        song_id: request.songId,
      },
    };

    return axiosClient
      .get(`/scores`, axiosRequest)
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
      .post(`${baseApiUrl}/scores/submit`, data, request)
      .then((): Result<Error, boolean> => ok(true))
      .catch(
        (): Result<Error, boolean> =>
          err(new Error('failed to post score'), false),
      );
  };

  return { getById, getAll, postScore };
};

export default scoresApiDao;
