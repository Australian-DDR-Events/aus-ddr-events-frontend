import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { err, ok, Result } from 'types/result';
import {
  DancerGradedIngredient,
  GradedIngredient,
  Ingredient,
  Summer2021Score,
} from 'types/summer2021';
import resizeImage from 'utils/images';

import { DefaultSummer2021Score } from '../scores/constants';
import { DefaultIngredient } from './constants';
import { IngredientsDao, ScoreSubmissionRequest } from './types';

const ingredientsApiDao = ({
  getIdTokenFunc,
  axiosClient,
}: {
  getIdTokenFunc: () => Promise<string>;
  axiosClient: AxiosInstance;
}): IngredientsDao => {
  const getAll = async (): Promise<Result<Error, Array<Ingredient>>> => {
    return axiosClient
      .get(`/summer2021/ingredients`)
      .then((response: AxiosResponse): Array<Ingredient> => {
        return response.data;
      })
      .then(
        (ingredients: Array<Ingredient>): Result<Error, Array<Ingredient>> =>
          ok(ingredients),
      )
      .catch((): Result<Error, Array<Ingredient>> => {
        return err(
          new Error('failed to get ingredients'),
          new Array<Ingredient>(),
        );
      });
  };

  const getById = async (id: string): Promise<Result<Error, Ingredient>> => {
    return axiosClient
      .get(`/summer2021/ingredients/${id}`)
      .then(
        (response: AxiosResponse<Ingredient>): Result<Error, Ingredient> =>
          ok(response.data),
      )
      .catch((): Result<Error, Ingredient> => {
        return err(new Error('failed to get ingredient'), DefaultIngredient);
      });
  };

  const getGrades = async (
    id: string,
  ): Promise<Result<Error, Array<GradedIngredient>>> => {
    return axiosClient
      .get(`/summer2021/ingredients/${id}/grades`)
      .then((response: AxiosResponse): Array<GradedIngredient> => {
        return response.data.map(
          (ingredientGrade: GradedIngredient): GradedIngredient =>
            ingredientGrade,
        );
      })
      .then(
        (
          ingredientGrades: Array<GradedIngredient>,
        ): Result<Error, Array<GradedIngredient>> => ok(ingredientGrades),
      )
      .catch((): Result<Error, Array<GradedIngredient>> => {
        return err(
          new Error('failed to get ingredient grades'),
          new Array<GradedIngredient>(),
        );
      });
  };

  const getGradedIngredientsByDancer = async (
    dancerId: string,
    topOnly: boolean,
  ): Promise<Result<Error, Array<DancerGradedIngredient>>> => {
    return axiosClient
      .get(`/summer2021/dancers/${dancerId}/ingredients?top_only=${topOnly}`)
      .then((response: AxiosResponse): Array<DancerGradedIngredient> => {
        return response.data;
      })
      .then(
        (
          ingredientGrades: Array<DancerGradedIngredient>,
        ): Result<Error, Array<DancerGradedIngredient>> => ok(ingredientGrades),
      )
      .catch((): Result<Error, Array<DancerGradedIngredient>> => {
        return err(
          new Error('failed to get ingredient grades'),
          new Array<DancerGradedIngredient>(),
        );
      });
  };

  const postScoreSubmission = async (
    id: string,
    submission: ScoreSubmissionRequest,
    onUploadProgress: any,
  ): Promise<Result<Error, Summer2021Score>> => {
    const data = new FormData();
    data.append('score', `${submission.score}`);
    data.append(
      'scoreImage',
      await resizeImage(submission.scoreImage, 1000, 1000),
    );

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    };

    return axiosClient
      .post(`/summer2021/ingredients/${id}`, data, request)
      .then(
        (
          response: AxiosResponse<Summer2021Score>,
        ): Result<Error, Summer2021Score> => ok(response.data),
      )
      .catch(
        (): Result<Error, Summer2021Score> =>
          err(new Error('failed to post score'), DefaultSummer2021Score),
      );
  };

  return {
    getAll,
    getById,
    getGrades,
    getGradedIngredientsByDancer,
    postScoreSubmission,
  };
};

export default ingredientsApiDao;
