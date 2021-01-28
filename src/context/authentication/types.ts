import { ReactNode } from 'react';
import { Result } from '../../types/result';

export type AuthenticationRepository = {
  login: (
    username: string,
    password: string,
    remember: boolean,
  ) => Promise<Result<Error, string>>;
  logout: () => Promise<Result<Error, void>>;
  get: () => Result<Error, string>;
  register: (email: string, password: string) => Promise<Result<Error, void>>;
  updatePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<Result<Error, void>>;
  onAuthStateChanged: (cb: AuthStateChangedCallback) => void;
};

export interface Login {
  (username: string, password: string, remember: boolean): Promise<
    Result<Error, string>
  >;
}

export interface Logout {
  (): Promise<Result<Error, void>>;
}

export interface Get {
  (): Result<Error, string>;
}

export interface Register {
  (email: string, password: string): Promise<Result<Error, void>>;
}

export interface UpdatePassword {
  (currentPassword: string, newPassword: string): Promise<Result<Error, void>>;
}

export interface OnAuthStateChanged {
  (cb: AuthStateChangedCallback): void;
}

export interface AuthenticationDao {
  login: Login;
  logout: Logout;
  get: Get;
  register: Register;
  updatePassword: UpdatePassword;
  onAuthStateChanged: OnAuthStateChanged;
}

export interface AuthenticationRepositoryContextInterface {
  authenticationRepositoryInstance: AuthenticationRepository;
}

export interface AuthenticationRepositoryProviderOptions {
  children?: ReactNode;
  authenticationRepositoryInstance: AuthenticationRepository;
}

export type AuthStateChangedCallback = () => void;
