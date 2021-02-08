import { Result } from 'types/result';
import {
  GetScoresRequest,
  Score,
  ScoresDao,
  ScoresRepository,
  ScoreSubmissionRequest,
} from './types';

const scoresRepository = (dao: ScoresDao): ScoresRepository => {
  const getById = (id: string): Promise<Result<Error, Score>> =>
    dao.getById(id);
  const getAll = (
    request: GetScoresRequest,
  ): Promise<Result<Error, Array<Score>>> => dao.getAll(request);
  const postScore = (
    submission: ScoreSubmissionRequest,
  ): Promise<Result<Error, boolean>> => dao.postScore(submission);

  return { getById, getAll, postScore };
};

export default scoresRepository;
