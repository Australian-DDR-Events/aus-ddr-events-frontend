import { err, ok, Result } from 'types/result';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  Dish,
  DishesDao,
  DishGrade,
  DishSubmissionRequest,
  DishSubmissionResponse,
} from './types';
import { DefaultDish, DefaultDishSubmissionResponse } from './constants';

const dishesApiDao = ({
  getIdTokenFunc,
  axiosClient,
}: {
  getIdTokenFunc: () => Promise<string>;
  axiosClient: AxiosInstance;
}): DishesDao => {
  const getById = async (id: string): Promise<Result<Error, Dish>> => {
    return axiosClient
      .get(`/summer2021/dishes/${id}`)
      .then(
        (response: AxiosResponse<Dish>): Result<Error, Dish> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Dish> => {
          return err(new Error('failed to get dish'), DefaultDish);
        },
      );
  };

  const getAll = async (): Promise<Result<Error, Array<Dish>>> => {
    return axiosClient
      .get(`/summer2021/dishes`)
      .then(
        (response: AxiosResponse<Array<Dish>>): Result<Error, Array<Dish>> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Array<Dish>> =>
          err(new Error('failed to get dishes'), new Array<Dish>()),
      );
  };

  const getGrades = async (
    id: string,
  ): Promise<Result<Error, Array<DishGrade>>> => {
    return axiosClient
      .get(`/summer2021/dishes/${id}/grades`)
      .then(
        (
          response: AxiosResponse<Array<DishGrade>>,
        ): Result<Error, Array<DishGrade>> => ok(response.data),
      )
      .catch(
        (): Result<Error, Array<DishGrade>> => {
          return err(new Error('failed to get grades'), new Array<DishGrade>());
        },
      );
  };

  const postSubmission = async (
    id: string,
    submission: DishSubmissionRequest,
  ): Promise<Result<Error, DishSubmissionResponse>> => {
    const data = new FormData();
    for (let i = 0; i < 3; i += 1) {
      data.append(`scores[${i}].score`, `${submission.scores[i].score}`);
      data.append(`scores[${i}].scoreImage`, submission.scores[i].scoreImage);
      data.append(`scores[${i}].songId`, submission.scores[i].songId);
    }
    data.append('pairBonus', `${submission.pairBonus}`);
    data.append('finalImage', submission.finalImage);

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    return axiosClient
      .post(`/summer2021/dishes/${id}/submission`, data, request)
      .then(
        (
          response: AxiosResponse<DishSubmissionResponse>,
        ): Result<Error, DishSubmissionResponse> => ok(response.data),
      )
      .catch(
        (): Result<Error, DishSubmissionResponse> =>
          err(new Error('failed to post score'), DefaultDishSubmissionResponse),
      );
  };

  return {
    getById,
    getAll,
    getGrades,
    postSubmission,
  };
};

export default dishesApiDao;
