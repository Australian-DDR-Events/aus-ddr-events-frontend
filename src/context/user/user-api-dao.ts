import { DefaultUser, User } from 'context/user';
import { err, ok, Result } from '~/types/result';

const dancerApiDao = ({
  getIdTokenFunc,
  baseApiUrl,
}: {
  getIdTokenFunc: () => Promise<string>;
  baseApiUrl: string;
}) => {
  const getHeaders = async (): Promise<Headers> => {
    const headers = new Headers();

    const token = await getIdTokenFunc();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  };

  const get = async (dancerId: string): Promise<Result<Error, User>> => {
    const token = await getIdTokenFunc();
    return fetch(`${baseApiUrl}/dancers/${dancerId}`, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then(
        (jsonData): Result<Error, User> => {
          const user: User = {
            dancerId: jsonData.DdrCode,
            dancerName: jsonData.DdrName,
            primaryMachine: jsonData.PrimaryMachineLocation,
            profilePicture: jsonData.ProfilePictureUrl,
            newProfilePicture: new File([''], 'filename'),
            state: jsonData.State,
            userName: '',
          };
          return ok(user);
        },
      )
      .catch(
        (): Result<Error, User> => {
          return err(new Error('failed to get user'), DefaultUser);
        },
      );
  };

  const update = async (user: User): Promise<Result<Error, boolean>> => {
    const headers = await getHeaders();

    const databaseUser = {
      ddrName: user.dancerName,
      ddrCode: user.dancerId,
      primaryMachineLocation: user.primaryMachine,
      state: user.state,
      profilePictureUrl: user.profilePicture,
    };

    const request: RequestInit = {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers,
      redirect: 'follow',
      body: JSON.stringify(databaseUser),
    };

    return fetch(`${baseApiUrl}/dancers`, request)
      .then((): Result<Error, boolean> => ok(true))
      .catch(
        (): Result<Error, boolean> =>
          err(new Error('failed to update user'), false),
      );

    return ok(true);
  };

  return { get, update };
};

export default dancerApiDao;
