import { Score, ScoreSubmissionRequest, Summer2021Score } from './types';

export const DefaultScore: Score = {
  id: '',
  value: 0,
  submissionTime: '',
  imageUrl: '',
  dancerId: '',
  songId: '',
};

export const DefaultSummer2021Score: Summer2021Score = {
  id: '',
  gradedIngredientId: '',
  dancerId: '',
  scoreId: '',
};

export const DefaultScoreSubmissionRequest: ScoreSubmissionRequest = {
  score: 0,
  scoreImage: new File([''], 'filename'),
  songId: '',
};
