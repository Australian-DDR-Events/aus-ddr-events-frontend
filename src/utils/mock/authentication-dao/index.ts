import {
  AuthStateChangedCallbackType,
  DefaultAuthenticationUser,
} from 'context/authentication';
import {
  AuthenticationDao,
  AuthenticationUser,
} from 'context/authentication/types';
import { err, Result } from 'types/result';

interface TestingAuthenticationDao extends AuthenticationDao {
  setLoginHook: (
    f: (
      username: string,
      password: string,
      remember: boolean,
    ) => Promise<Result<Error, string>>,
  ) => void;
  setLogoutHook: (f: () => Promise<Result<Error, void>>) => void;
  setGetHook: (f: () => Result<Error, AuthenticationUser>) => void;
  setRegisterHook: (
    f: (email: string, password: string) => Promise<Result<Error, void>>,
  ) => void;
  setUpdatePasswordHook: (
    f: (
      oldPassword: string,
      newPassword: string,
    ) => Promise<Result<Error, void>>,
  ) => void;
  setOnAuthStateChangedHook: (
    f: (cb: AuthStateChangedCallbackType) => void,
  ) => void;
  setSendPasswordResetEmailHook: (
    f: (email: string) => Promise<Result<Error, void>>,
  ) => void;
}

const authenticationTestingDao = (): TestingAuthenticationDao => {
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

  let getHook: () => Result<Error, AuthenticationUser> = (): Result<
    Error,
    AuthenticationUser
  > => {
    return err(new Error('get hook not overridden'), DefaultAuthenticationUser);
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

  let sendPasswordResetEmailHook: (
    email: string,
  ) => Promise<Result<Error, void>> = async (): Promise<
    Result<Error, void>
  > => {
    return err(
      new Error('sendPasswordResetEmail hook not overridden'),
      undefined,
    );
  };

  let onAuthStateChangedHook: (cb: AuthStateChangedCallbackType) => void =
    (): void => {};

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

  const setGetHook = (f: () => Result<Error, AuthenticationUser>) => {
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

  const setSendPasswordResetEmailHook = (
    f: (email: string) => Promise<Result<Error, void>>,
  ) => {
    sendPasswordResetEmailHook = f;
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
  const get = (): Result<Error, AuthenticationUser> => getHook();
  const register = async (
    email: string,
    password: string,
  ): Promise<Result<Error, void>> => registerHook(email, password);
  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<Result<Error, void>> =>
    updatePasswordHook(currentPassword, newPassword);
  const sendPasswordResetEmail = (
    email: string,
  ): Promise<Result<Error, void>> => sendPasswordResetEmailHook(email);
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
    sendPasswordResetEmail,
    setSendPasswordResetEmailHook,
    onAuthStateChanged,
    setOnAuthStateChangedHook,
  };
};

export default authenticationTestingDao;
