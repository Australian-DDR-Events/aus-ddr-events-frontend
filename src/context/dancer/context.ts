import { createContext } from 'react';
import { err } from 'types/result';

import { DefaultDancer } from './constants';
import { DancersRepositoryContextInterface } from './types';

const initialContext = {
  dancersRepositoryInstance: {
    get: async () =>
      err(new Error('dancers repository not initialized'), DefaultDancer),
    getByAuthenticationId: async () =>
      err(new Error('dancers repository not initialized'), DefaultDancer),
    update: async () =>
      err(new Error('dancers repository not initialized'), false),
  },
};

// eslint-disable-next-line max-len
const DancersRepositoryContext = createContext<DancersRepositoryContextInterface>(
  initialContext,
);

export default DancersRepositoryContext;
