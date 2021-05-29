import { FirebaseContext } from 'context/firebase-app';
// eslint-disable-next-line import/no-extraneous-dependencies
import firebase from 'firebase/app';
import { useContext } from 'react';

const useFirebaseApp = (): firebase.app.App => {
  const firebaseApp = useContext(FirebaseContext);
  if (firebaseApp === undefined) throw new Error('firebaseApp is undefined');
  return firebaseApp;
};

export default useFirebaseApp;
