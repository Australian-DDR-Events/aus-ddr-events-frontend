// eslint-disable-next-line import/no-extraneous-dependencies
import firebase from 'firebase/app';
import React from 'react';

const FirebaseContext =
  React.createContext<firebase.app.App | undefined>(undefined);

const FirebaseProvider = ({
  firebaseApp,
  children,
}: {
  firebaseApp: firebase.app.App;
  children: React.ReactNode;
}) => {
  return (
    <FirebaseContext.Provider value={firebaseApp}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
