import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultDancer } from './constants';
import { DancersRepositoryContextInterface } from './types';

const initialContext = {
  dancersRepositoryInstance: {
    get: async () =>
      err(new Error('dancers repository not initialized'), DefaultDancer),
    update: async () =>
      err(new Error('dancers repository not initialized'), false),
  },
};

const DancersRepositoryContext = createContext<DancersRepositoryContextInterface>(
  initialContext,
);

export default DancersRepositoryContext;
