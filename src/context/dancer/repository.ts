import { Result } from 'types/result';

import { Dancer, DancersDao, DancersRepository } from './types';

const dancersRepository = (dao: DancersDao): DancersRepository => {
  const get = (id: string): Promise<Result<Error, Dancer>> => dao.get(id);

  const update = (user: Dancer): Promise<Result<Error, boolean>> =>
    dao.update(user);

  return { get, update };
};

export default dancersRepository;
