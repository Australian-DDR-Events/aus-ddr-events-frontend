interface SongDifficultyScore {
  value: number;
  dancerId: string;
}

interface SongDifficulty {
  difficultyId: string;
  mode: number;
  difficulty: number;
  level: number;
  scores: Array<SongDifficultyScore>;
}

export interface SongResponse {
  songId: string;
  name: string;
  artist: string;
  songDifficulties: Array<SongDifficulty>;
}
