import { Result } from 'types/result';

export interface AuthenticationService {
  login: () => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isPending: () => boolean;
  getClaim: <T>(claimName: string) => Result<Error, T | undefined>;
  getAccessToken: () => string;
}
