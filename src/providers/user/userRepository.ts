import { Result } from '../../common/Result';
import { User, UserRepository, UserDao } from './types';

const userRepository = (dao: UserDao): UserRepository => {
  const get = (id: string): Promise<Result<Error, User>> => dao.get(id);

  const update = (user: User): Promise<Result<Error, boolean>> =>
    dao.update(user);

  return { get, update };
};

export default userRepository;
