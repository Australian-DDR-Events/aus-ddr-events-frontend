import { err, Result } from '../../../types/result';
import { AuthStateChangedCallbackType } from '../../../context/authentication';

const authenticationDao = () => {
  let loginHook: (
    username: string,
    password: string,
    remember: boolean,
  ) => Promise<Result<Error, string>> = async (): Promise<
    Result<Error, string>
  > => {
    return err(new Error('login hook not overridden'), '');
  };

  let logoutHook: () => Promise<Result<Error, void>> = async (): Promise<
    Result<Error, void>
  > => {
    return err(new Error('logout hook not overridden'), undefined);
  };

  let getHook: () => Result<Error, string> = (): Result<Error, string> => {
    return err(new Error('get hook not overridden'), '');
  };

  let registerHook: (
    email: string,
    password: string,
  ) => Promise<Result<Error, void>> = async (): Promise<
    Result<Error, void>
  > => {
    return err(new Error('register hook not overridden'), undefined);
  };

  let updatePasswordHook: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<Result<Error, void>> = async (): Promise<
    Result<Error, void>
  > => {
    return err(new Error('updatePassword hook not overridden'), undefined);
  };

  let onAuthStateChangedHook: (
    cb: AuthStateChangedCallbackType,
  ) => void = (): void => {};

  const setLoginHook = (
    f: (
      username: string,
      password: string,
      remember: boolean,
    ) => Promise<Result<Error, string>>,
  ) => {
    loginHook = f;
  };

  const setLogoutHook = (f: () => Promise<Result<Error, void>>) => {
    logoutHook = f;
  };

  const setGetHook = (f: () => Result<Error, string>) => {
    getHook = f;
  };

  const setRegisterHook = (
    f: (email: string, password: string) => Promise<Result<Error, void>>,
  ) => {
    registerHook = f;
  };

  const setUpdatePasswordHook = (
    f: (
      oldPassword: string,
      newPassword: string,
    ) => Promise<Result<Error, void>>,
  ) => {
    updatePasswordHook = f;
  };

  const setOnAuthStateChangedHook = (
    f: (cb: AuthStateChangedCallbackType) => void,
  ) => {
    onAuthStateChangedHook = f;
  };

  const login = (
    username: string,
    password: string,
    remember: boolean,
  ): Promise<Result<Error, string>> => loginHook(username, password, remember);
  const logout = (): Promise<Result<Error, void>> => logoutHook();
  const get = (): Result<Error, string> => getHook();
  const register = async (
    email: string,
    password: string,
  ): Promise<Result<Error, void>> => registerHook(email, password);
  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<Result<Error, void>> =>
    updatePasswordHook(currentPassword, newPassword);
  const onAuthStateChanged = (cb: AuthStateChangedCallbackType): void =>
    onAuthStateChangedHook(cb);

  return {
    login,
    setLoginHook,
    logout,
    setLogoutHook,
    get,
    setGetHook,
    register,
    setRegisterHook,
    updatePassword,
    setUpdatePasswordHook,
    onAuthStateChanged,
    setOnAuthStateChangedHook,
  };
};

export default authenticationDao;
