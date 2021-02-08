import { Result } from 'types/result';
import { Song, SongsDao, SongsRepository } from './types';

const songsRepository = (dao: SongsDao): SongsRepository => {
  const getSongs = (): Promise<Result<Error, Array<Song>>> => dao.getSongs();
  const getSong = (id: string): Promise<Result<Error, Song>> => dao.getSong(id);

  return { getSongs, getSong };
};

export default songsRepository;
