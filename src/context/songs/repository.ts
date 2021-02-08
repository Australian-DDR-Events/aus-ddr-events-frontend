import { Result } from 'types/result';
import { Song, SongsDao, SongsRepository } from './types';

const songsRepository = (dao: SongsDao): SongsRepository => {
  const getAll = (): Promise<Result<Error, Array<Song>>> => dao.getAll();
  const getById = (id: string): Promise<Result<Error, Song>> => dao.getById(id);

  return { getAll, getById };
};

export default songsRepository;
