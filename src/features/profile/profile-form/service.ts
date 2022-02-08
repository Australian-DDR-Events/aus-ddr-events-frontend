import useAxios from 'axios-hooks';
import { ServicePostResponse } from 'types/service';

const PutCurrentUser = (): ServicePostResponse => {
  const [{ loading, error }, execute] = useAxios('/dancers');

  return {
    loading,
    error,
    execute,
  };
};

export { PutCurrentUser };
