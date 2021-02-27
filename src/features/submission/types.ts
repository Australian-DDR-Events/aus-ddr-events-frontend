import { Song } from "context/songs/types";
import { Ingredient } from "context/ingredients/types";

export type SongIngredient = {
  song: Song;
  ingredient: Ingredient;
  submitted: boolean;
}