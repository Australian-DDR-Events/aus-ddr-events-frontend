import firebase from 'firebase';
import { Result, Ok, Err, ok, err } from '../../common/Result';
import { AuthenticationDao, AuthStateChangedCallback } from './types';

const authenticationFirebaseDao = (
  firebaseApp: firebase.app.App,
): AuthenticationDao => {
  let user: firebase.User | null = null;
  const onAuthStateChangedCallbacks: AuthStateChangedCallback[] = [];

  firebaseApp.auth().onAuthStateChanged((a) => {
    user = a;
    onAuthStateChangedCallbacks.forEach((cb) => {
      cb();
    });
  });

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
      .catch((e): Err<Error, string> => err(e, ''));
  };

  const logout = async (): Promise<Result<Error, void>> => {
    return firebaseApp
      .auth()
      .signOut()
      .then((): Ok<Error, void> => ok(undefined))
      .catch((e): Err<Error, void> => err(e, undefined));
  };

  const get = (): Result<Error, string> => {
    if (user) {
      return ok(user.uid);
    }
    return err(new Error('user not logged in'), '');
  };

  const onAuthStateChanged = (callback: AuthStateChangedCallback) => {
    onAuthStateChangedCallbacks.push(callback);
  };

  return { login, logout, get, onAuthStateChanged };
};

export default authenticationFirebaseDao;
