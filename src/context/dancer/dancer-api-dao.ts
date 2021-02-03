import { DefaultUser, User } from 'context/dancer';
import { err, ok, Result } from 'types/result';

const dancerApiDao = ({
  getIdTokenFunc,
  baseApiUrl,
}: {
  getIdTokenFunc: () => Promise<string>;
  baseApiUrl: string;
}) => {
  const getHeadersWithAuthorization = async (): Promise<Headers> => {
    const headers = new Headers();

    const token = await getIdTokenFunc();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  };

  const createRequestInit = ({
    headers,
    method,
    body,
  }: {
    headers: Headers;
    method: string;
    body?: string;
  }) => {
    const bodyMethods: string[] = ['POST', 'PATCH', 'PUT'];

    const request: RequestInit = {
      mode: 'cors',
      cache: 'no-cache',
      headers,
      redirect: 'follow',
    };

    if (bodyMethods.includes(method.toUpperCase())) request.body = body;

    return request;
  };

  const get = async (dancerId: string): Promise<Result<Error, User>> => {
    const headers = await getHeadersWithAuthorization();
    const request = createRequestInit({ headers, method: 'GET' });

    return fetch(`${baseApiUrl}/dancers/${dancerId}`, request)
      .then((response) => response.json())
      .then(
        (jsonData): Result<Error, User> => {
          const user: User = {
            id: jsonData.id,
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
    const headers = await getHeadersWithAuthorization();
    headers.append('Content-Type', 'application/json');

    const dancer = {
      ddrName: user.dancerName || '',
      ddrCode: user.dancerId || '',
      primaryMachineLocation: user.primaryMachine || '',
      state: user.state || '',
      profilePictureUrl: user.profilePicture || '',
    };

    const requestMethod = user.id ? 'PUT' : 'POST';
    const endpoint = user.id ? `dancers/${user.id}` : 'dancers';

    const request = createRequestInit({
      headers,
      method: requestMethod,
      body: JSON.stringify(dancer),
    });

    return fetch(`${baseApiUrl}/${endpoint}`, request)
      .then((): Result<Error, boolean> => ok(true))
      .catch(
        (): Result<Error, boolean> =>
          err(new Error('failed to update user'), false),
      );
  };

  return { get, update };
};

export default dancerApiDao;
