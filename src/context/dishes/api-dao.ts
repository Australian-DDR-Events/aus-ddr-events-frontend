import { err, ok, Result } from 'types/result';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Dish, DishesDao, DishGrade, DishSubmissionRequest, DishSubmissionResponse } from './types';
import { DefaultDish, DefaultDishSubmissionResponse } from './constants';

const dishesApiDao = ({
  getIdTokenFunc,
  baseApiUrl,
}: {
  getIdTokenFunc: () => Promise<string>;
  baseApiUrl: string;
}): DishesDao => {
  const axiosClient = axios.create({
    baseURL: baseApiUrl,
    timeout: 6000,
  });

  const getById = async (id: string): Promise<Result<Error, Dish>> => {
    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
      },
    };

    return axiosClient
      .get(`/summer2021/dishes/${id}`, request)
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
    const axiosRequest: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
      },
    };

    return axiosClient
      .get(`/summer2021/dishes`, axiosRequest)
      .then(
        (response: AxiosResponse<Array<Dish>>): Result<Error, Array<Dish>> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Array<Dish>> =>
          err(new Error('failed to get dishes'), new Array<Dish>()),
      );
  };

  const getGrades = async (id: string): Promise<Result<Error, Array<DishGrade>>> => {
    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
      },
    };

    return axiosClient
      .get(`/summer2021/dishes/${id}/grades`, request)
      .then(
        (response: AxiosResponse<Array<DishGrade>>): Result<Error, Array<DishGrade>> =>
          ok(response.data),
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
    for (let i = 0; i < 3; i++) {
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
      .then((response: AxiosResponse<DishSubmissionResponse>): Result<Error, DishSubmissionResponse> =>
        ok(response.data),
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
