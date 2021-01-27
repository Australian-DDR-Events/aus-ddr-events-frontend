import firebase from 'firebase';
import authenticationFirebaseDao from '../firebase-dao';

describe('firebaseDao', () => {
  const firebaseAuth = {
    ...jest.createMockFromModule<firebase.auth.Auth>('firebase'),
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  };

  const firebaseApp = jest.createMockFromModule<firebase.app.App>('firebase');
  firebaseApp.auth = () => firebaseAuth;

  const dao = authenticationFirebaseDao(firebaseApp);
  test('should run onAuthStateChanged callbacks', () => {});

  test('should call signInWithEmailAndPassword when login is called', () => {
    firebaseAuth.signInWithEmailAndPassword.mockResolvedValue(undefined);
    firebaseAuth.signInWithEmailAndPassword.mockRejectedValue(undefined);
    dao.login('testUser', 'testPassword');

    expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      'testUser',
      'testPassword',
    );
  });

  test('should call signOut when logout is called', () => {
    firebaseAuth.signOut.mockResolvedValue(undefined);
    firebaseAuth.signOut.mockRejectedValue(undefined);
    dao.logout();

    expect(firebaseAuth.signOut).toHaveBeenCalled();
  });
});
