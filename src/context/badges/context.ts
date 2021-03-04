import { createContext } from 'react';
import { err } from 'types/result';
import { Badge, BadgesRepositoryContextInterface } from './types';

const initialContext = {
  badgesRepositoryInstance: {
    getById: async () =>
      err(new Error('badges repository not initialized'), new Array<Badge>()),
  },
};

const BadgesRepositoryContext = createContext<BadgesRepositoryContextInterface>(
  initialContext,
);

export default BadgesRepositoryContext;
