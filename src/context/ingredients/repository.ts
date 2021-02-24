import { Result } from 'types/result';
import {
  Ingredient,
  IngredientGrade,
  IngredientsDao,
  IngredientsRepository,
} from './types';

const ingredientsRepository = (dao: IngredientsDao): IngredientsRepository => {
  const getAll = (): Promise<Result<Error, Array<Ingredient>>> => dao.getAll();
  const getById = (id: string): Promise<Result<Error, Ingredient>> =>
    dao.getById(id);
  const getGrades = (
    id: string,
  ): Promise<Result<Error, Array<IngredientGrade>>> => dao.getGrades(id);

  return { getAll, getById, getGrades };
};

export default ingredientsRepository;
