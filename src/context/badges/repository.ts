import { Result } from 'types/result';
import { Badge, BadgesDao, BadgesRepository } from './types';

const badgesRepository = (dao: BadgesDao): BadgesRepository => {
  const getById = (id: string): Promise<Result<Error, Array<Badge>>> =>
    dao.getById(id);

  return { getById };
};

export default badgesRepository;
