import React from 'react';

import AdminRepositoryContext from './context';
import { AdminRepositoryProviderOptions } from './types';

const AdminRepositoryProvider = (options: AdminRepositoryProviderOptions) => (
  <AdminRepositoryContext.Provider
    value={{ adminRepositoryInstance: options.instance }}
  >
    {options.children}
  </AdminRepositoryContext.Provider>
);

export default AdminRepositoryProvider;
