import { User, UserRepository, UserDao } from './types';

const userRepository = (dao: UserDao): UserRepository => {
  const get = (id: string): Promise<User> => dao.get(id);

  const update = (user: User): Promise<boolean> => dao.update(user);

  return { get, update };
};

export default userRepository;
