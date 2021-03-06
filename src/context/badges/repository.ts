import { Result } from 'types/result';
import { Badge, BadgesDao, BadgesRepository } from './types';

const badgesRepository = (dao: BadgesDao): BadgesRepository => {
  const getById = (id: string): Promise<Result<Error, Badge>> =>
    dao.getById(id);
  const getForDancerId = (id: string): Promise<Result<Error, Array<Badge>>> =>
    dao.getForDancerId(id);

  return { getById, getForDancerId };
};

export default badgesRepository;
