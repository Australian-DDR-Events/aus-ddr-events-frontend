import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultDancer } from './constants';
import { Dancer, DancersRepositoryContextInterface } from './types';

const initialContext = {
  dancersRepositoryInstance: {
    getAll: async () => 
      err(new Error('dancersrepository not initialized'), new Array<Dancer>()),
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
