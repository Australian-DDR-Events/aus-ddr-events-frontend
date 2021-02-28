import { DefaultDish } from "context/dishes/constants";
import { Song } from "context/songs/types";
import { SongIngredient } from "../submission/types";
import { Recipe } from "./types";

/* eslint-disable import/prefer-default-export */
export const DefaultRecipe: Recipe = {
  dish: DefaultDish,
  songIngredients: new Array<SongIngredient>(),
  songs: new Array<Song>(),
};
