export interface ScoreSubmissonFormData {
  score: number;
  scoreImage: File;
  songId: string;
}

export interface FinalSubmissionForm {
  pairBonus: boolean;
  finalImage: File;
}

export interface DishSubmissionFormData extends FinalSubmissionForm {
  dishId: string;
  scores: ScoreSubmissonFormData[];
}

export const DefaultDishSubmissionSongForm: ScoreSubmissonFormData = {
  songId: '',
  score: 0,
  scoreImage: {
    name: '',
    lastModified: 0,
    size: 0,
    type: '',
    arrayBuffer: async () => new ArrayBuffer(0),
    slice: () => new Blob(),
    stream: () => new ReadableStream(),
    text: async () => '',
  },
};
