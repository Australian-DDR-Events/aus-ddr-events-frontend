import { Result } from 'types/result';

import { Dancer, DancersDao, DancersRepository } from './types';

const dancersRepository = (dao: DancersDao): DancersRepository => {
  const get = (id: string): Promise<Result<Error, Dancer>> => dao.get(id);
  const getByAuthenticationId = (
    authenticationId: string,
  ): Promise<Result<Error, Dancer>> =>
    dao.getByAuthenticationId(authenticationId);

  const update = (user: Dancer): Promise<Result<Error, boolean>> =>
    dao.update(user);

  return { get, getByAuthenticationId, update };
};

export default dancersRepository;
