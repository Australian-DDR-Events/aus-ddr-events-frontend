import firebase from 'firebase';
import useFirebaseApp from 'hooks/use-firebase-app';
import { useEffect } from 'react';
import { Err, err, Ok, ok, Result } from 'types/result';

import {
  UseFirebaseAuthentication,
  UseFirebaseAuthenticationParams,
} from './types';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;

const useFirebaseAuthentication = ({
  firebaseUser,
  setFirebaseUser,
  setLoggedInUser,
  handleAuthChanged,
}: UseFirebaseAuthenticationParams): UseFirebaseAuthentication => {
  const firebaseApp = useFirebaseApp();

  if (handleAuthChanged) {
    firebaseApp.auth().onAuthStateChanged(async (user) => {
      handleAuthChanged(user);
    });

    useEffect(() => {
      // Translate firebase user to our user type
      if (firebaseUser === null) {
        setLoggedInUser(null);
      } else {
        firebaseUser.getIdToken().then((token) => {
          setLoggedInUser({
            id: firebaseUser.uid,
            isVerified: firebaseUser.emailVerified,
            token,
          });
        });
      }
    }, [firebaseUser]);
  }

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
      .then((result): Ok<Error, string> => {
        if (!result.user) throw new Error('unknown user');
        setFirebaseUser(result.user);
        return ok(result.user.uid);
      })
      .catch((e): Err<Error, string> => err(e, ''));
  };

  const logout = async (): Promise<Result<Error, void>> => {
    return firebaseApp
      .auth()
      .signOut()
      .then((): Ok<Error, void> => ok(undefined))
      .catch((e): Err<Error, void> => err(e, undefined));
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<Result<Error, void>> => {
    if (!firebaseUser || !firebaseUser.email) {
      return err(new Error('user not logged in'), undefined);
    }
    return firebaseUser
      .reauthenticateWithCredential(
        EmailAuthProvider.credential(firebaseUser.email, currentPassword),
      )
      .then((userCredential): Ok<Error, void> => {
        setFirebaseUser(userCredential.user);
        firebaseUser?.updatePassword(newPassword);
        return ok(undefined);
      })
      .catch((): Err<Error, void> => {
        return err(new Error('failed to update password'), undefined);
      });
  };

  const register = async (
    email: string,
    password: string,
  ): Promise<Result<Error, void>> => {
    return firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result): Result<Error, void> => {
        setFirebaseUser(result.user);
        return ok(undefined);
      })
      .catch((error): Result<Error, void> => {
        return err(error, undefined);
      });
  };

  const sendPasswordResetEmail = async (
    email: string,
  ): Promise<Result<Error, void>> => {
    return firebaseApp
      .auth()
      .sendPasswordResetEmail(email, {
        url: `${process.env.BASE_URL}/login`,
      })
      .then((): Result<Error, void> => {
        return ok(undefined);
      })
      .catch((e): Result<Error, void> => {
        return err(e, undefined);
      });
  };

  const isAdmin = async (): Promise<Result<Error, boolean>> => {
    if (firebaseUser) {
      return firebaseUser.getIdTokenResult().then((result) => {
        return ok(result.claims.admin != null);
      });
    }
    return err(new Error('user not signed in'), false);
  };

  const onAuthStateChanged = (
    callback: (user: firebase.User | null) => void,
  ) => {
    firebaseApp.auth().onAuthStateChanged(async (user) => {
      callback(user);
    });
  };

  const onAuthStateChangedToken = (callback: (token: string) => void) => {
    firebaseApp.auth().onAuthStateChanged(async (user) => {
      if (user) {
        callback(await user.getIdToken());
      }
    });
  };

  return {
    login,
    logout,
    register,
    isAdmin,
    sendPasswordResetEmail,
    onAuthStateChanged,
    onAuthStateChangedToken,
    updatePassword,
  };
};

export default useFirebaseAuthentication;
