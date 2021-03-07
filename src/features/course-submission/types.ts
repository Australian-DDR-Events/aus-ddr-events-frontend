export interface ScoreSubmissonFormData {
  score: number | undefined;
  scoreImage: File | undefined;
  songId: string | undefined;
}

export interface DishSubmissionFormData {
  scores: ScoreSubmissonFormData[];
  dishId: string;
  pairBonus: boolean;
  finalImage: File | undefined;
}
