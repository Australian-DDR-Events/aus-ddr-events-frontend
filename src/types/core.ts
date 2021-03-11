import { Dancer } from '../context/dancer';

export type BaseScore = {
  id: string;
  value: number;
  submissionTime: string;
  imageUrl: string;
  dancerId: string | null;
  songId: string;
};

export type Score = {
  id: string;
  value: number;
  submissionTime: string;
  imageUrl: string;
  dancerId: string | null;
  dancer: Dancer | null;
  songId: string;
  song: Song | null;
};

export type Song = {
  id: string;
  name: string;
  artist: string;
  difficulty: string;
  maxScore: number;
  level: number;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
  image512: string;
};
