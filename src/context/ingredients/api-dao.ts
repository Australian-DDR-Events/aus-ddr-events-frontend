import { err, ok, Result } from 'types/result';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Ingredient, IngredientsDao } from './types';
import { DefaultIngredient } from './constants';

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
          return response.data.map((ingredient: Ingredient): Ingredient => ingredient);
        },
      )
      .then((ingredients: Array<Ingredient>): Result<Error, Array<Ingredient>> => ok(ingredients))
      .catch(
        (): Result<Error, Array<Ingredient>> => {
          return err(new Error('failed to get ingredients'), new Array<Ingredient>());
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

  return { getAll, getById };
};

export default ingredientsApiDao;
