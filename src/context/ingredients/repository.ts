import { Result } from 'types/result';
import {
  DancerGradedIngredient,
  GradedIngredient,
  Ingredient,
  Summer2021Score,
} from 'types/summer2021';
import {
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
  ): Promise<Result<Error, Array<GradedIngredient>>> => dao.getGrades(id);
  const getGradedIngredientsByDancer = (
    dancerId: string,
    topOnly: boolean,
  ): Promise<Result<Error, Array<DancerGradedIngredient>>> =>
    dao.getGradedIngredientsByDancer(dancerId, topOnly);
  const postScoreSubmission = (
    id: string,
    submission: ScoreSubmissionRequest,
    onUploadProgress: any,
  ): Promise<Result<Error, Summer2021Score>> =>
    dao.postScoreSubmission(id, submission, onUploadProgress);

  return {
    getAll,
    getById,
    getGrades,
    postScoreSubmission,
    getGradedIngredientsByDancer,
  };
};

export default ingredientsRepository;
