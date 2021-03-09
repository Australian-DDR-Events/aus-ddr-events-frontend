import { DefaultBadge } from 'context/badges/constants';
import { createContext } from 'react';
import { err } from 'types/result';

import { Badge, BadgesRepositoryContextInterface } from './types';

const initialContext = {
  badgesRepositoryInstance: {
    getAll: async () =>
      err(new Error('badges repository not initialized'), new Array<Badge>()),
    getById: async () =>
      err(new Error('badges repository not initialized'), DefaultBadge),
    getForDancerId: async () =>
      err(new Error('badges repository not initialized'), new Array<Badge>()),
    assignBadge: async () =>
      err(new Error('badges repository not initialized'), undefined),
    revokeBadge: async () =>
      err(new Error('badges repository not initialized'), undefined),
  },
};

const BadgesRepositoryContext = createContext<BadgesRepositoryContextInterface>(
  initialContext,
);

export default BadgesRepositoryContext;
