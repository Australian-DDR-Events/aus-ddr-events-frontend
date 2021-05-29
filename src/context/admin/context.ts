import { createContext } from 'react';
import { err } from 'types/result';

import { AdminRepositoryContextInterface } from './types';

const initialContext = {
  adminRepositoryInstance: {
    uploadImage: async () =>
      err(new Error('admin repository not initialized'), undefined),
  },
};

const AdminRepositoryContext =
  createContext<AdminRepositoryContextInterface>(initialContext);

export default AdminRepositoryContext;
