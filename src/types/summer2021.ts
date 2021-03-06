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
  song: Song | null;
}

export interface GradedIngredient extends IngredientBase<'gradedIngredient'> {
  grade: string;
  description: string;
}

export interface DishBase<T> {
  id: string;
  type: T;
  name: string;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
}

export interface Dish extends DishBase<'dish'> {
  songs: Array<DishSong>;
  ingredients: Array<Ingredient>;
}

export interface GradedDish extends DishBase<'gradedDish'> {
  grade: string;
  description: string;
}

export type DishSong = {
  id: string;
  cookingOrder: number;
  cookingMethod: string;
  song: Song | null;
};

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
