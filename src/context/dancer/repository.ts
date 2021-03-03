import { Result } from 'types/result';
import { Dancer, AllDancers, DancersRepository, DancersDao } from './types';

const dancersRepository = (dao: DancersDao): DancersRepository => {
  const getAll = (): Promise<Result<Error, Array<AllDancers>>> => dao.getAll();
  const get = (id: string): Promise<Result<Error, Dancer>> => dao.get(id);

  const update = (user: Dancer): Promise<Result<Error, boolean>> =>
    dao.update(user);

  return { get, update, getAll };
};

export default dancersRepository;
