import firebase from 'firebase';
import { Result, Ok, Err, ok, err } from '../../common/Result';
import { AuthenticationDao } from './types';

const authenticationFirebaseDao = (
  firebaseApp: firebase.app.App,
): AuthenticationDao => {
  const login = async (
    username: string,
    password: string,
  ): Promise<Result<Error, string>> => {
    return firebaseApp
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(
        (result): Ok<Error, string> => {
          if (!result.user) throw new Error('unknown user');
          return ok(result.user.uid);
        },
      )
      .catch((e): Err<Error, string> => err(e));
  };

  const logout = async (): Promise<Result<Error, void>> => {
    return firebaseApp
      .auth()
      .signOut()
      .then((): Ok<Error, void> => ok(undefined))
      .catch((e): Err<Error, void> => err(e));
  };

  const get = async (): Promise<Result<Error, string>> => {
    const currentUser = firebaseApp.auth().currentUser;
    if (currentUser) {
      return ok(currentUser.uid);
    }
    return err(new Error('user not logged in'));
  };

  return { login, logout, get };
};

export default authenticationFirebaseDao;
