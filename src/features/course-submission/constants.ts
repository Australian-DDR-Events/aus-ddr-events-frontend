import { DefaultDish, DefaultDishSong } from "context/dishes/constants";
import { DefaultSong } from "context/songs/constants";
import { SongIngredient } from "../submission/types";
import { DetailedDishSong, Recipe } from "./types";

export const DefaultRecipe: Recipe = {
  dish: DefaultDish,
  songIngredients: new Array<SongIngredient>(),
  songs: new Array<DetailedDishSong>(),
};

export const DefaultDetailedDishSong: DetailedDishSong = {
  dishSong: DefaultDishSong,
  songDetails: DefaultSong,
}
