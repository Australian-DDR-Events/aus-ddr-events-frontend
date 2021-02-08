import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultScore } from './constants';
import { Score, ScoresRepositoryContextInterface } from './types';

const initialContext = {
  scoresRepositoryInstance: {
    getScore: async () =>
      err(new Error('scores repository not initialized'), DefaultScore),
    getScores: async () =>
      err(new Error('scores repository not initialized'), new Array<Score>()),
    postScore: async () =>
      err(new Error('scores repository not initialized'), false),
  },
};

const ScoresRepositoryContext = createContext<ScoresRepositoryContextInterface>(
  initialContext,
);

export default ScoresRepositoryContext;
