import { Result } from '../../types/result';
import {
  AuthenticationDao,
  AuthenticationRepository,
  AuthStateChangedCallback,
} from './types';

const authenticationRepository = (
  dao: AuthenticationDao,
): AuthenticationRepository => {
  const login = (
    username: string,
    password: string,
    remember: boolean,
  ): Promise<Result<Error, string>> => dao.login(username, password, remember);
  const logout = (): Promise<Result<Error, void>> => dao.logout();
  const get = (): Result<Error, string> => dao.get();
  const register = async (
    email: string,
    password: string,
  ): Promise<Result<Error, void>> => dao.register(email, password);
  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<Result<Error, void>> =>
    dao.updatePassword(currentPassword, newPassword);
  const sendPasswordResetEmail = async (
    email: string,
  ): Promise<Result<Error, void>> => dao.sendPasswordResetEmail(email);
  const onAuthStateChanged = (cb: AuthStateChangedCallback): void =>
    dao.onAuthStateChanged(cb);

  return {
    login,
    logout,
    get,
    updatePassword,
    register,
    sendPasswordResetEmail,
    onAuthStateChanged,
  };
};

export default authenticationRepository;
