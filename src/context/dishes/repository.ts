import { Result } from 'types/result';
import {
  DishesDao,
  DishesRepository,
  DishSubmissionRequest,
  DishSubmissionResponse,
} from './types';
import { Dish, DishSong, GradedDish } from '~/types/summer2021';

const dishesRepository = (dao: DishesDao): DishesRepository => {
  const getById = (id: string): Promise<Result<Error, Dish>> => dao.getById(id);
  const getAll = (): Promise<Result<Error, Array<Dish>>> => dao.getAll();
  const getSongs = (id: string): Promise<Result<Error, Array<DishSong>>> =>
    dao.getSongs(id);
  const getGrades = (id: string): Promise<Result<Error, Array<GradedDish>>> =>
    dao.getGrades(id);
  const postSubmission = (
    id: string,
    submission: DishSubmissionRequest,
  ): Promise<Result<Error, DishSubmissionResponse>> =>
    dao.postSubmission(id, submission);

  return {
    getById,
    getAll,
    getSongs,
    getGrades,
    postSubmission,
  };
};

export default dishesRepository;
