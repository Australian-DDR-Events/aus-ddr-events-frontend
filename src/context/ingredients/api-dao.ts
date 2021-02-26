import { err, ok, Result } from 'types/result';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Ingredient, IngredientGrade, IngredientsDao, ScoreSubmissionRequest } from './types';
import { DefaultIngredient } from './constants';
import { Summer2021Score } from '../scores/types';
import { DefaultSummer2021Score } from '../scores/constants';

const ingredientsApiDao = ({
  getIdTokenFunc,
  baseApiUrl,
}: {
  getIdTokenFunc: () => Promise<string>;
  baseApiUrl: string;
}): IngredientsDao => {
  const axiosClient = axios.create({
    baseURL: baseApiUrl,
    timeout: 6000,
  });

  const getAll = async (): Promise<Result<Error, Array<Ingredient>>> => {
    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
      },
    };

    return axiosClient
      .get(`/summer2021/ingredients`, request)
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
    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
      },
    };

    return axiosClient
      .get(`/summer2021/ingredients/${id}`, request)
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
    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
      },
    };

    return axiosClient
      .get(`/summer2021/ingredients/${id}/grades`, request)
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
      .then((
        response: AxiosResponse<Summer2021Score>,
      ): Result<Error, Summer2021Score> => ok(response.data))
      .catch(
        (): Result<Error, Summer2021Score> =>
          err(new Error('failed to post score'), DefaultSummer2021Score),
      );
  };

  return { getAll, getById, getGrades, postScoreSubmission };
};

export default ingredientsApiDao;
