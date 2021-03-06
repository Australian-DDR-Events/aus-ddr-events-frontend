import { Score, Song } from './core';

export interface IngredientBase<T> {
  id: string;
  type: T;
  name: string;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
}

export interface Ingredient extends IngredientBase<'ingredient'> {
  name: string;
  song: Song;
}

export interface GradedIngredient extends IngredientBase<'gradedIngredient'> {
  grade: string;
  requiredScore: number;
  description: string;
}

export type ScoreSubmissionRequest = {
  score: number;
  scoreImage: File;
};

export type Summer2021Score = {
  id: string;
  gradedIngredient: GradedIngredient;
  dancerId: string;
  score: Score;
};

export type DancerGradedIngredient = Summer2021Score;
