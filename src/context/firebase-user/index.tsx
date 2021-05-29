// eslint-disable-next-line import/no-extraneous-dependencies
import firebase from 'firebase/app';
import React from 'react';

const FirebaseUserContext = React.createContext<{
  firebaseUser: firebase.User | null;
  setFirebaseUser: (user: firebase.User | null) => void;
}>({
  firebaseUser: null,
  setFirebaseUser: () => {},
});

const FirebaseUserProvider = ({
  firebaseUser,
  setFirebaseUser,
  children,
}: {
  firebaseUser: firebase.User | null;
  setFirebaseUser: (user: firebase.User | null) => void;
  children: React.ReactNode;
}) => (
  <FirebaseUserContext.Provider value={{ firebaseUser, setFirebaseUser }}>
    {children}
  </FirebaseUserContext.Provider>
);

export { FirebaseUserContext, FirebaseUserProvider };
