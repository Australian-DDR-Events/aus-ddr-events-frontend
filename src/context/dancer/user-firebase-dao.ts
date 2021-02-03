import firebase from 'firebase';
import { ok, Result } from 'types/result';
import { User, UserDao } from './types';
import { DefaultUser } from './constants';

const userFirebaseDao = (firebaseApp: firebase.app.App): UserDao => {
  const storage = firebaseApp.storage();
  const get = async (id: string): Promise<Result<Error, User>> => {
    const currentAuthUser = firebaseApp.auth().currentUser;
    const user: User = { ...DefaultUser };
    if (!currentAuthUser) return ok(user);
    user.emailVerified = currentAuthUser.emailVerified;

    return firebaseApp
      .database()
      .ref(`users/${id}`)
      .get()
      .then(async (snap: firebase.database.DataSnapshot) => {
        user.dancerName = snap.child('dancerName').val();
        user.dancerId = snap.child('dancerId').val();
        user.state = snap.child('state').val();
        user.primaryMachine = snap.child('pmachine').val();
        user.userName = snap.child('userName').val();

        try {
          const profilePictureSnap = await storage
            .ref(`${id} - images/ProfilePicture`)
            .getDownloadURL();
          user.profilePicture = profilePictureSnap;
        } catch {
          user.profilePicture = '';
        }

        return ok(user);
      });
  };

  const update = async (user: User): Promise<Result<Error, boolean>> => {
    const currentAuthUser = firebaseApp.auth().currentUser;
    if (!currentAuthUser) return ok(false);

    await firebaseApp.database().ref(`users/${currentAuthUser.uid}`).update({
      dancerName: user.dancerName,
      dancerId: user.dancerId,
      state: user.state,
      pmachine: user.primaryMachine,
      userName: user.userName,
    });

    if (user.newProfilePicture.size !== 0) {
      await storage
        .ref(`${currentAuthUser.uid} - images/ProfilePicture`)
        .put(user.newProfilePicture);
    }

    return ok(true);
  };

  return {
    get,
    update,
  };
};

export default userFirebaseDao;
