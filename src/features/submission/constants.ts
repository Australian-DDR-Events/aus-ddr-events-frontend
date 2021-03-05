import { DefaultIngredient } from 'context/ingredients/constants';
import { DefaultSong } from 'context/songs/constants';
import { SongIngredient } from './types';

/* eslint-disable import/prefer-default-export */
export const DefaultSongIngredient: SongIngredient = {
  song: DefaultSong,
  ingredient: DefaultIngredient,
  submitted: false,
};
