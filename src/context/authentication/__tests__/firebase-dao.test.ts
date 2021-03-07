import 'firebase/auth';

import firebase from 'firebase/app';

import authenticationFirebaseDao from '../firebase-dao';

describe('firebaseDao', () => {
  const firebaseAuth = {
    ...jest.createMockFromModule<firebase.auth.Auth>('firebase'),
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    setPersistence: jest.fn(),
  };

  const firebaseApp = jest.createMockFromModule<firebase.app.App>('firebase');
  firebaseApp.auth = () => firebaseAuth;

  const dao = authenticationFirebaseDao(firebaseApp);
  test('should run onAuthStateChanged callbacks', () => {});

  test('should call signInWithEmailAndPassword when login is called', async () => {
    firebaseAuth.signInWithEmailAndPassword.mockResolvedValue(undefined);
    firebaseAuth.signInWithEmailAndPassword.mockRejectedValue(undefined);
    await dao.login('testUser', 'testPassword', true);

    expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      'testUser',
      'testPassword',
    );
  });

  test('should call signOut when logout is called', async () => {
    firebaseAuth.signOut.mockResolvedValue(undefined);
    firebaseAuth.signOut.mockRejectedValue(undefined);
    await dao.logout();

    expect(firebaseAuth.signOut).toHaveBeenCalled();
  });
});
