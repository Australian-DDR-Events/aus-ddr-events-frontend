import { Result } from 'types/result';
import { Ingredient } from '../ingredients/types';
import {
  Dish,
  DishesDao,
  DishesRepository,
  DishGrade,
  DishSubmissionRequest,
  DishSubmissionResponse,
} from './types';

const dishesRepository = (dao: DishesDao): DishesRepository => {
  const getById = (id: string): Promise<Result<Error, Dish>> => dao.getById(id);
  const getAll = (): Promise<Result<Error, Array<Dish>>> => dao.getAll();
  const getIngredients = (id: string): Promise<Result<Error, Array<Ingredient>>> => dao.getIngredients(id);
  const getGrades = (id: string): Promise<Result<Error, Array<DishGrade>>> =>
    dao.getGrades(id);
  const postSubmission = (
    id: string,
    submission: DishSubmissionRequest,
  ): Promise<Result<Error, DishSubmissionResponse>> =>
    dao.postSubmission(id, submission);

  return {
    getById,
    getAll,
    getIngredients,
    getGrades,
    postSubmission,
  };
};

export default dishesRepository;
