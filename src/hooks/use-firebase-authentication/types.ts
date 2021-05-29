import firebase from 'firebase';
import { LoggedInUser } from 'hooks/use-authentication/types';
import { Result } from 'types/result';

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

export interface IsAdmin {
  (): Promise<Result<Error, boolean>>;
}

export interface OnAuthStateChanged {
  (cb: AuthStateChangedCallback): void;
}
export interface UseFirebaseAuthentication {
  login: Login;
  logout: Logout;
  register: Register;
  updatePassword: UpdatePassword;
  sendPasswordResetEmail: SendPasswordResetEmail;
  isAdmin: IsAdmin;
  onAuthStateChanged: OnAuthStateChanged;
  onAuthStateChangedToken: (callback: (token: string) => void) => void;
}

export type AuthenticationUser = {
  id: string;
  hasVerifiedEmail: boolean;
};

export type AuthStateChangedCallbackResult = {
  user: firebase.User | null;
};

export type AuthStateChangedCallback = (user: firebase.User | null) => void;

export interface UseFirebaseAuthenticationParams {
  firebaseUser: firebase.User | null;
  setFirebaseUser: (user: firebase.User | null) => void;
  setLoggedInUser: (user: LoggedInUser | null) => void;
  /**
   * Handle when auth state changed at the highest level component that is App
   */
  handleAuthChanged?: (user: firebase.User | null) => void;
}
