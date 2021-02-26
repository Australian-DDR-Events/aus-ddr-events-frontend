import { Result } from 'types/result';
import { Summer2021Score } from '../scores/types';
import {
  Ingredient,
  IngredientGrade,
  IngredientsDao,
  IngredientsRepository,
  ScoreSubmissionRequest,
} from './types';

const ingredientsRepository = (dao: IngredientsDao): IngredientsRepository => {
  const getAll = (): Promise<Result<Error, Array<Ingredient>>> => dao.getAll();
  const getById = (id: string): Promise<Result<Error, Ingredient>> =>
    dao.getById(id);
  const getGrades = (
    id: string,
  ): Promise<Result<Error, Array<IngredientGrade>>> => dao.getGrades(id);
  const postScoreSubmission = (
    id: string,
    submission: ScoreSubmissionRequest,
  ): Promise<Result<Error, Summer2021Score>> => dao.postScoreSubmission(id, submission);

  return { getAll, getById, getGrades, postScoreSubmission };
};

export default ingredientsRepository;
