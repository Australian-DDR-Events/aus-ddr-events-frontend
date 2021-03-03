import { createContext } from 'react';
import { err } from 'types/result';
import { DefaultDancer } from './constants';
import { AllDancers, DancersRepositoryContextInterface } from './types';

const initialContext = {
  dancersRepositoryInstance: {
    getAll: async () => 
      err(
        new Error('dancersrepository not initialized'),
        new Array<AllDancers>(),
      ),
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
