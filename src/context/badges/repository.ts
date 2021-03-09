import { Result } from 'types/result';

import { Badge, BadgesDao, BadgesRepository } from './types';

const badgesRepository = (dao: BadgesDao): BadgesRepository => {
  const getAll = (): Promise<Result<Error, Array<Badge>>> => dao.getAll();
  const getById = (id: string): Promise<Result<Error, Badge>> =>
    dao.getById(id);
  const getForDancerId = (id: string): Promise<Result<Error, Array<Badge>>> =>
    dao.getForDancerId(id);
  const assignBadge = (
    dancerId: string,
    badgeId: string,
  ): Promise<Result<Error, void>> => dao.assignBadge(dancerId, badgeId);
  const revokeBadge = (
    dancerId: string,
    badgeId: string,
  ): Promise<Result<Error, void>> => dao.revokeBadge(dancerId, badgeId);

  return { getAll, getById, getForDancerId, assignBadge, revokeBadge };
};

export default badgesRepository;
