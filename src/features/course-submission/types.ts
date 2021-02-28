import { Dish } from "context/dishes/types";
import { SongIngredient } from "../submission/types";

export type Recipe = {
  dish: Dish
  songIngredients: Array<SongIngredient>
};