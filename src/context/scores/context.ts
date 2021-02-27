import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultScore, DefaultSummer2021Score } from './constants';
import {
  Score,
  ScoresRepositoryContextInterface,
  Summer2021Score,
} from './types';

const initialContext = {
  scoresRepositoryInstance: {
    getById: async () =>
      err(new Error('scores repository not initialized'), DefaultScore),
    getAll: async () =>
      err(new Error('scores repository not initialized'), new Array<Score>()),
    postScore: async () =>
      err(new Error('scores repository not initialized'), false),
    getSummer2021ByDancer: async () =>
      err(
        new Error('scores repository not initialized'),
        new Array<Summer2021Score>(),
      ),
    getSummer2021: async () =>
      err(
        new Error('scores repository not initialized'),
        DefaultSummer2021Score,
      ),
    postSummer2021: async () =>
      err(
        new Error('scores repository not initialized'),
        DefaultSummer2021Score,
      ),
  },
};

const ScoresRepositoryContext = createContext<ScoresRepositoryContextInterface>(
  initialContext,
);

export default ScoresRepositoryContext;
