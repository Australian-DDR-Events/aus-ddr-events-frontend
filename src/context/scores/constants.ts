import { Score } from 'types/core';
import { Summer2021Score } from 'types/summer2021';

import { ScoreSubmissionRequest } from './types';

export const DefaultScore: Score = {
  id: '',
  value: 0,
  submissionTime: '',
  imageUrl: '',
  dancerId: '',
  dancer: null,
  songId: '',
  song: null,
};

export const DefaultSummer2021Score: Summer2021Score = {
  id: '',
  gradedIngredient: {
    id: '',
    grade: '',
    description: '',
    type: 'gradedIngredient',
    name: '',
    image32: '',
    image64: '',
    image128: '',
    image256: '',
  },
  dancerId: '',
  score: DefaultScore,
};

export const DefaultScoreSubmissionRequest: ScoreSubmissionRequest = {
  score: 0,
  scoreImage: new File([''], 'filename'),
  songId: '',
};
