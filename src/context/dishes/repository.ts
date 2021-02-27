import { Result } from 'types/result';
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
    getGrades,
    postSubmission,
  };
};

export default dishesRepository;
