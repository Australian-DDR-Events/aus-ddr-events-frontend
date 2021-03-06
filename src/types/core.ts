export type Score = {
  id: string;
  value: number;
  submissionTime: string;
  imageUrl: string;
  dancerId: string;
  songId: string;
};

export type Song = {
  id: string;
  name: string;
  artist: string;
  difficulty: string;
  level: number;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
  image512: string;
};
