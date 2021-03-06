import { Result } from 'types/result';
import { Song } from 'types/core';
import { SongsDao, SongsRepository } from './types';

const songsRepository = (dao: SongsDao): SongsRepository => {
  const getAll = (): Promise<Result<Error, Song[]>> => dao.getAll();
  const getById = (id: string): Promise<Result<Error, Song>> => dao.getById(id);
  const getByIds = (songIds: string[]): Promise<Result<Error, Song[]>> =>
    dao.getByIds(songIds);
  return { getAll, getById, getByIds };
};

export default songsRepository;
