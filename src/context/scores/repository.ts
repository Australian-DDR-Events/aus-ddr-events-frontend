import { Result } from 'types/result';
import {
  GetScoresRequest,
  GetSummer2021Request,
  Score,
  ScoresDao,
  ScoresRepository,
  ScoreSubmissionRequest,
  Summer2021Score,
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
  const getSummer2021ByDancer = (
    id: string,
  ): Promise<Result<Error, Array<Summer2021Score>>> =>
    dao.getSummer2021ByDancer(id);
  const getSummer2021 = (
    request: GetSummer2021Request,
  ): Promise<Result<Error, Summer2021Score>> => dao.getSummer2021(request);

  return {
    getById,
    getAll,
    postScore,
    getSummer2021ByDancer,
    getSummer2021,
  };
};

export default scoresRepository;
