import { Result } from '../../common/Result';
import { AuthenticationDao, AuthenticationRepository } from './types';

const autenticationRepository = (
  dao: AuthenticationDao,
): AuthenticationRepository => {
  const login = (
    username: string,
    password: string,
  ): Promise<Result<Error, string>> => dao.login(username, password);
  const logout = (): Promise<Result<Error, void>> => dao.logout();
  const get = (): Promise<Result<Error, string>> => dao.get();

  return { login, logout, get };
};

export default autenticationRepository;
