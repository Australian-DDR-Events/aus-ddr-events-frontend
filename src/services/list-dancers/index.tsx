import { AxiosRequestConfig } from 'axios';
import useApi from 'context/use-api';

import { Dancer } from './types';

type ListDancersData = [Boolean, Array<Dancer> | undefined];

const useListDancers = (page: Number, limit: Number): ListDancersData => {
  const requestOptions: AxiosRequestConfig = {
    url: '/dancers',
    params: {
      page: page || 0,
      limit: limit || 10,
    },
  };

  const { loading, value: dancers } = useApi<Array<Dancer>>(requestOptions);

  return [loading, dancers];
};

export default useListDancers;
