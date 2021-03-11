import { Result } from 'types/result';
import { DancerGradedDish, Dish, DishSong, GradedDish } from 'types/summer2021';

import {
  DishesDao,
  DishesRepository,
  DishSubmissionRequest,
  DishSubmissionResponse,
} from './types';

const dishesRepository = (dao: DishesDao): DishesRepository => {
  const getById = (id: string): Promise<Result<Error, Dish>> => dao.getById(id);
  const getAll = (): Promise<Result<Error, Array<Dish>>> => dao.getAll();
  const getSongs = (id: string): Promise<Result<Error, Array<DishSong>>> =>
    dao.getSongs(id);
  const getGrades = (id: string): Promise<Result<Error, Array<GradedDish>>> =>
    dao.getGrades(id);
  const getDancerGradedDishes = (
    dancerId: string,
  ): Promise<Result<Error, Array<DancerGradedDish>>> =>
    dao.getDancerGradedDishes(dancerId);
  const postSubmission = (
    id: string,
    submission: DishSubmissionRequest,
    onUploadProgress: any,
  ): Promise<Result<Error, DishSubmissionResponse>> =>
    dao.postSubmission(id, submission, onUploadProgress);

  return {
    getById,
    getAll,
    getSongs,
    getGrades,
    getDancerGradedDishes,
    postSubmission,
  };
};

export default dishesRepository;
