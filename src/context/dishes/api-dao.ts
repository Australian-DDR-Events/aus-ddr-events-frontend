import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { err, ok, Result } from 'types/result';
import { DancerGradedDish, Dish, DishSong, GradedDish } from 'types/summer2021';
import resizeImage from 'utils/images';

import { DefaultDish, DefaultDishSubmissionResponse } from './constants';
import {
  DishesDao,
  DishSubmissionRequest,
  DishSubmissionResponse,
} from './types';

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
      .catch((): Result<Error, Dish> => {
        return err(new Error('failed to get dish'), DefaultDish);
      });
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

  const getSongs = async (
    id: string,
  ): Promise<Result<Error, Array<DishSong>>> => {
    return axiosClient
      .get(`/summer2021/dishes/${id}/songs`)
      .then(
        (
          response: AxiosResponse<Array<DishSong>>,
        ): Result<Error, Array<DishSong>> => ok(response.data),
      )
      .catch((): Result<Error, Array<DishSong>> => {
        return err(new Error('failed to get songs'), new Array<DishSong>());
      });
  };

  const getGrades = async (
    id: string,
  ): Promise<Result<Error, Array<GradedDish>>> => {
    return axiosClient
      .get(`/summer2021/dishes/${id}/grades`)
      .then(
        (
          response: AxiosResponse<Array<GradedDish>>,
        ): Result<Error, Array<GradedDish>> => ok(response.data),
      )
      .catch((): Result<Error, Array<GradedDish>> => {
        return err(new Error('failed to get grades'), new Array<GradedDish>());
      });
  };

  /**
   * Get a list of graded dishes for the given dancer's ID
   * @param dancerId The dancer's ID
   * @returns a list of the given dancer's graded dishes
   */
  const getDancerGradedDishes = async (
    dancerId: string,
  ): Promise<Result<Error, DancerGradedDish[]>> => {
    return axiosClient
      .get(`/summer2021/dancers/${dancerId}/dishes`)
      .then(
        (
          response: AxiosResponse<DancerGradedDish[]>,
        ): Result<Error, DancerGradedDish[]> => ok(response.data),
      )
      .catch((): Result<Error, DancerGradedDish[]> => {
        return err(
          new Error('failed to get grades'),
          new Array<DancerGradedDish>(),
        );
      });
  };

  const postSubmission = async (
    id: string,
    submission: DishSubmissionRequest,
    onUploadProgress: any,
  ): Promise<Result<Error, DishSubmissionResponse>> => {
    const data = new FormData();
    for (let i = 0; i < 3; i += 1) {
      data.append(`scores[${i}].score`, `${submission.scores[i].score}`);
      data.append(
        `scores[${i}].scoreImage`,
        // eslint-disable-next-line no-await-in-loop
        await resizeImage(submission.scores[i].scoreImage, 1000, 1000),
      );
      data.append(`scores[${i}].songId`, submission.scores[i].songId);
    }
    data.append('pairBonus', `${submission.pairBonus}`);
    data.append(
      'finalImage',
      await resizeImage(submission.finalImage, 1000, 1000),
    );

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
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
    getSongs,
    getGrades,
    getDancerGradedDishes,
    postSubmission,
  };
};

export default dishesApiDao;
