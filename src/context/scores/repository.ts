import { Score } from 'types/core';
import { Result } from 'types/result';
import { Summer2021Score } from 'types/summer2021';

import {
  GetScoresRequest,
  GetSummer2021Request,
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
  const getTop = (songIds: string[]): Promise<Result<Error, Array<Score>>> =>
    dao.getTop(songIds);
  const postScore = (
    submission: ScoreSubmissionRequest,
  ): Promise<Result<Error, boolean>> => dao.postScore(submission);
  const getSummer2021 = (
    request: GetSummer2021Request,
  ): Promise<Result<Error, Summer2021Score>> => dao.getSummer2021(request);

  return {
    getById,
    getAll,
    getTop,
    postScore,
    getSummer2021,
  };
};

export default scoresRepository;
