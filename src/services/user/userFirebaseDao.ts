import firebase from 'firebase';
import { User, UserDao } from './types';

const userFirebaseDao = (firebaseApp: firebase.app.App): UserDao => {
  const storage = firebaseApp.storage();
  const get = async (id: string): Promise<User> => {
    const currentAuthUser = JSON.parse(localStorage.getItem('authUser') || '');
    const user: User = {
      dancerId: '',
      dancerName: '',
      displayName: '',
      primaryMachine: '',
      profilePicture: '',
      state: '',
      userName: '',
    };
    if (!currentAuthUser) return user;

    return firebaseApp
      .database()
      .ref(`users/${id}`)
      .get()
      .then(async (snap: firebase.database.DataSnapshot) => {
        user.dancerName = snap.child('dancerName').val();
        user.dancerId = snap.child('dancerId').val();
        user.state = snap.child('state').val();
        user.primaryMachine = snap.child('pmachine').val();

        user.userName = id;
        user.displayName = currentAuthUser.displayName ?? '';

        try {
          const profilePictureSnap = await storage
            .ref(
              `${currentAuthUser.displayName} - ${id} - images/ProfilePicture`,
            )
            .getDownloadURL();
          user.profilePicture = profilePictureSnap;
        } catch {
          user.profilePicture = '';
        }

        return user;
      });
  };

  const update = async (user: User): Promise<boolean> => {
    const currentAuthUser = JSON.parse(localStorage.getItem('authUser') || '');
    if (!currentAuthUser) return false;

    await firebaseApp.database().ref(`users/${currentAuthUser.uid}`).update({
      dancerName: user.dancerName,
      dancerId: user.dancerId,
      state: user.state,
      pmachine: user.primaryMachine,
    });

    await currentAuthUser.updateProfile({
      displayName: user.displayName,
    });

    await storage
      .ref(
        `${currentAuthUser.displayName} - ${currentAuthUser.uid} - images/ProfilePicture`,
      )
      .putString(user.profilePicture);

    return true;
  };

  return {
    get,
    update,
  };
};

export default userFirebaseDao;
