import { Result } from 'types/result';
import {
  GetScoresRequest,
  Score,
  ScoresDao,
  ScoresRepository,
  ScoreSubmissionRequest,
} from './types';

const scoresRepository = (dao: ScoresDao): ScoresRepository => {
  const getScore = (id: string): Promise<Result<Error, Score>> =>
    dao.getScore(id);
  const getScores = (
    request: GetScoresRequest,
  ): Promise<Result<Error, Array<Score>>> => dao.getScores(request);
  const postScore = (
    submission: ScoreSubmissionRequest,
  ): Promise<Result<Error, boolean>> => dao.postScore(submission);

  return { getScore, getScores, postScore };
};

export default scoresRepository;
