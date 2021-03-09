import { ReactNode } from 'react';
import { Result } from 'types/result';

export type AuthenticationUser = {
  id: string;
  hasVerifiedEmail: boolean;
};

export type AuthenticationRepository = {
  login: (
    username: string,
    password: string,
    remember: boolean,
  ) => Promise<Result<Error, string>>;
  logout: () => Promise<Result<Error, void>>;
  get: () => Result<Error, AuthenticationUser>;
  register: (email: string, password: string) => Promise<Result<Error, void>>;
  updatePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<Result<Error, void>>;
  sendPasswordResetEmail: (email: string) => Promise<Result<Error, void>>;
  getClaim: (claim: string) => Promise<Result<Error, any>>;

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
  (): Result<Error, AuthenticationUser>;
}

export interface Register {
  (email: string, password: string): Promise<Result<Error, void>>;
}

export interface UpdatePassword {
  (currentPassword: string, newPassword: string): Promise<Result<Error, void>>;
}

export interface SendPasswordResetEmail {
  (email: string): Promise<Result<Error, void>>;
}

export interface GetClaim {
  (claim: string): Promise<Result<Error, any>>;
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
  sendPasswordResetEmail: SendPasswordResetEmail;
  getClaim: GetClaim;
  onAuthStateChanged: OnAuthStateChanged;
}

export interface AuthenticationRepositoryContextInterface {
  authenticationRepositoryInstance: AuthenticationRepository;
}

export interface AuthenticationRepositoryProviderOptions {
  children?: ReactNode;
  instance: AuthenticationRepository;
}

export type AuthStateChangedCallback = () => void;
