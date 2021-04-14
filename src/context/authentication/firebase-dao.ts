import 'firebase/auth';

import firebase from 'firebase/app';
import { Err, err, Ok, ok, Result } from 'types/result';

import { DefaultAuthenticationUser } from './constants';
import {
  AuthenticationDao,
  AuthenticationUser,
  AuthStateChangedCallback,
} from './types';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;

const authenticationFirebaseDao = (
  firebaseApp: firebase.app.App,
): AuthenticationDao => {
  let user: firebase.User | null = null;
  const onAuthStateChangedCallbacks: AuthStateChangedCallback[] = [];

  firebaseApp.auth().onAuthStateChanged(async (a) => {
    user = a;
    const token = await user?.getIdToken();
    onAuthStateChangedCallbacks.forEach((cb) => {
      cb({ token });
    });
  });

  const login = async (
    username: string,
    password: string,
    remember: boolean,
  ): Promise<Result<Error, string>> => {
    const persistenceLevel = remember
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;
    await firebaseApp.auth().setPersistence(persistenceLevel);
    return firebaseApp
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(
        (result): Ok<Error, string> => {
          if (!result.user) throw new Error('unknown user');
          user = result.user;
          return ok(user.uid);
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

  const get = (): Result<Error, AuthenticationUser> => {
    if (user) {
      const authUser: AuthenticationUser = {
        id: user.uid,
        hasVerifiedEmail: user.emailVerified,
      };
      return ok(authUser);
    }
    return err(new Error('user not logged in'), DefaultAuthenticationUser);
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<Result<Error, void>> => {
    if (!user || !user.email) {
      return err(new Error('user not logged in'), undefined);
    }
    return user
      .reauthenticateWithCredential(
        EmailAuthProvider.credential(user.email, currentPassword),
      )
      .then(
        (userCredential): Ok<Error, void> => {
          user = userCredential.user;
          user?.updatePassword(newPassword);
          return ok(undefined);
        },
      )
      .catch(
        (): Err<Error, void> => {
          return err(new Error('failed to update password'), undefined);
        },
      );
  };

  const register = async (
    email: string,
    password: string,
  ): Promise<Result<Error, void>> => {
    return firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        (result): Result<Error, void> => {
          user = result.user;
          return ok(undefined);
        },
      )
      .catch(
        (error): Result<Error, void> => {
          return err(error, undefined);
        },
      );
  };

  const sendPasswordResetEmail = async (
    email: string,
  ): Promise<Result<Error, void>> => {
    return firebaseApp
      .auth()
      .sendPasswordResetEmail(email, {
        url: `${process.env.BASE_URL}/login`,
      })
      .then(
        (): Result<Error, void> => {
          return ok(undefined);
        },
      )
      .catch(
        (e): Result<Error, void> => {
          return err(e, undefined);
        },
      );
  };

  const getClaim = async (claim: string): Promise<Result<Error, any>> => {
    if (user) {
      return user.getIdTokenResult().then((result) => ok(result.claims[claim]));
    }
    return err(new Error('user not signed in'), undefined);
  };

  const onAuthStateChanged = (callback: AuthStateChangedCallback) => {
    onAuthStateChangedCallbacks.push(callback);
  };

  return {
    login,
    logout,
    get,
    updatePassword,
    register,
    sendPasswordResetEmail,
    getClaim,
    onAuthStateChanged,
  };
};

export default authenticationFirebaseDao;
