import { LoggedInUser } from 'hooks/use-authentication/types';
import { Result } from 'types/result';

export interface AuthenticationContextParams {
  loggedInUser: LoggedInUser | null;
  setLoggedInUser: (loggedInUser: LoggedInUser | null) => void;
  login: (
    username: string,
    password: string,
    remember: boolean,
  ) => Promise<Result<Error, string>>;
  logout: () => Promise<Result<Error, void>>;
  register: (email: string, password: string) => Promise<Result<Error, void>>;
  isAdmin: () => Promise<Result<Error, boolean>>;
  sendPasswordResetEmail: (email: string) => Promise<Result<Error, void>>;
  onAuthStateChanged: (callback: (token: string) => void) => void;
}
