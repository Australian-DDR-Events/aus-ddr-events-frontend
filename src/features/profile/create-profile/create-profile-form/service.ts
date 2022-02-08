import useAxios from 'axios-hooks';
import { ServicePostResponse } from 'types/service';

const PostCurrentUser = (): ServicePostResponse => {
  const [{ loading, error }, execute] = useAxios('/dancers');

  return {
    loading,
    error,
    execute,
  };
};

export { PostCurrentUser };
