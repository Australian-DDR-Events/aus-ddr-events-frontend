import { Result } from 'types/result';
import { Ingredient, IngredientsDao, IngredientsRepository } from './types';

const ingredientsRepository = (dao: IngredientsDao): IngredientsRepository => {
  const getAll = (): Promise<Result<Error, Array<Ingredient>>> => dao.getAll();
  const getById = (id: string): Promise<Result<Error, Ingredient>> =>
    dao.getById(id);

  return { getAll, getById };
};

export default ingredientsRepository;
