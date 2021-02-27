import { err, ok, Result } from 'types/result';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  Ingredient,
  IngredientGrade,
  IngredientsDao,
  ScoreSubmissionRequest,
} from './types';
import { DefaultIngredient } from './constants';
import { Summer2021Score } from '../scores/types';
import { DefaultSummer2021Score } from '../scores/constants';

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
      .then(
        (response: AxiosResponse): Array<Ingredient> => {
          return response.data.map(
            (ingredient: Ingredient): Ingredient => ingredient,
          );
        },
      )
      .then(
        (ingredients: Array<Ingredient>): Result<Error, Array<Ingredient>> =>
          ok(ingredients),
      )
      .catch(
        (): Result<Error, Array<Ingredient>> => {
          return err(
            new Error('failed to get ingredients'),
            new Array<Ingredient>(),
          );
        },
      );
  };

  const getById = async (id: string): Promise<Result<Error, Ingredient>> => {
    return axiosClient
      .get(`/summer2021/ingredients/${id}`)
      .then(
        (response: AxiosResponse<Ingredient>): Result<Error, Ingredient> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Ingredient> => {
          return err(new Error('failed to get ingredient'), DefaultIngredient);
        },
      );
  };

  const getGrades = async (
    id: string,
  ): Promise<Result<Error, Array<IngredientGrade>>> => {
    return axiosClient
      .get(`/summer2021/ingredients/${id}/grades`)
      .then(
        (response: AxiosResponse): Array<IngredientGrade> => {
          return response.data.map(
            (ingredientGrade: IngredientGrade): IngredientGrade =>
              ingredientGrade,
          );
        },
      )
      .then(
        (
          ingredientGrades: Array<IngredientGrade>,
        ): Result<Error, Array<IngredientGrade>> => ok(ingredientGrades),
      )
      .catch(
        (): Result<Error, Array<IngredientGrade>> => {
          return err(
            new Error('failed to get ingredient grades'),
            new Array<IngredientGrade>(),
          );
        },
      );
  };

  const postScoreSubmission = async (
    id: string,
    submission: ScoreSubmissionRequest,
  ): Promise<Result<Error, Summer2021Score>> => {
    const data = new FormData();
    data.append('score', `${submission.score}`);
    data.append('scoreImage', submission.scoreImage);

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'multipart/form-data',
      },
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

  return { getAll, getById, getGrades, postScoreSubmission };
};

export default ingredientsApiDao;
