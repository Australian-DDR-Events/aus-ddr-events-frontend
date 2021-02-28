import { Dish, DishSong } from "context/dishes/types";
import { Song } from "context/songs/types";
import { SongIngredient } from "../submission/types";

export type Recipe = {
  dish: Dish
  songIngredients: Array<SongIngredient>
  songs: Array<DetailedDishSong>
};

export type DetailedDishSong = {
  dishSong: DishSong
  songDetails: Song
}