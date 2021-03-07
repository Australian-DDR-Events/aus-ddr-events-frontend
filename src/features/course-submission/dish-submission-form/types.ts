export interface DishSubmissionSongForm {
  songId: string;
  score: number;
  scoreImage: File;
}

export interface FinalSubmissionForm {
  pairBonus: boolean;
  finalImage: File;
}

export const DefaultDishSubmissionSongForm: DishSubmissionSongForm = {
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
