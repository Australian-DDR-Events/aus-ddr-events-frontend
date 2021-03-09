import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Dancer, DefaultDancer } from 'context/dancer';
import { DancersDao } from 'context/dancer/types';
import { err, ok, Result } from 'types/result';

const dancersApiDao = ({
  getIdTokenFunc,
  axiosClient,
}: {
  getIdTokenFunc: () => Promise<string>;
  axiosClient: AxiosInstance;
}): DancersDao => {
  const activeDancers = new Map<string, Dancer>();

  const get = async (dancerId: string): Promise<Result<Error, Dancer>> => {
    const activeDancer = activeDancers.get(dancerId);
    if (activeDancer) return ok(activeDancer);

    return axiosClient
      .get(`/dancers/${dancerId}`)
      .then(
        (response: AxiosResponse): Result<Error, Dancer> => {
          const dancer: Dancer = {
            id: response.data.id,
            ddrCode: response.data.ddrCode,
            ddrName: response.data.ddrName,
            primaryMachine: response.data.primaryMachineLocation,
            profilePictureUrl: response.data.profilePictureUrl,
            newProfilePicture: new File([''], 'filename'),
            state: response.data.state,
          };
          activeDancers.set(dancerId, dancer);
          return ok(dancer);
        },
      )
      .catch(
        (): Result<Error, Dancer> => {
          return err(new Error('failed to get user'), DefaultDancer);
        },
      );
  };

  const getByAuthenticationId = async (
    authenticationId: string,
  ): Promise<Result<Error, Dancer>> => {
    const activeDancer = activeDancers.get('authUser');
    if (activeDancer) return ok(activeDancer);

    return axiosClient
      .get(`/dancers/${authenticationId}`)
      .then(
        (response: AxiosResponse): Result<Error, Dancer> => {
          const dancer: Dancer = {
            id: response.data.id,
            ddrCode: response.data.ddrCode,
            ddrName: response.data.ddrName,
            primaryMachine: response.data.primaryMachineLocation,
            profilePictureUrl: response.data.profilePictureUrl,
            newProfilePicture: new File([''], 'filename'),
            state: response.data.state,
          };
          activeDancers.set('authUser', dancer);
          return ok(dancer);
        },
      )
      .catch(
        (): Result<Error, Dancer> => {
          return err(new Error('failed to get user'), DefaultDancer);
        },
      );
  };

  const uploadProfilePicture = async (
    file: File,
  ): Promise<Result<Error, boolean>> => {
    const data = new FormData();
    data.append('profilePicture', file);

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    return axiosClient
      .post('/dancers/profilepicture', data, request)
      .then((): Result<Error, boolean> => ok(true))
      .catch(
        (): Result<Error, boolean> =>
          err(new Error('failed to update user'), false),
      );
  };

  const create = async (dancer: Dancer): Promise<Result<Error, boolean>> => {
    const dancerSubmission = {
      ddrName: dancer.ddrName || '',
      ddrCode: dancer.ddrCode || '',
      primaryMachineLocation: dancer.primaryMachine || '',
      state: dancer.state || '',
      profilePictureUrl: dancer.profilePictureUrl || '',
    };

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: 'dancers',
      data: dancerSubmission,
    };

    let result = axiosClient
      .request(request)
      .then((): Result<Error, boolean> => ok(true))
      .catch(
        (): Result<Error, boolean> =>
          err(new Error('failed to update dancer'), false),
      );

    if (dancer.newProfilePicture.size > 0) {
      result = uploadProfilePicture(dancer.newProfilePicture);
    }

    return result;
  };

  const update = async (dancer: Dancer): Promise<Result<Error, boolean>> => {
    const dancerSubmission = {
      ddrName: dancer.ddrName || '',
      ddrCode: dancer.ddrCode || '',
      primaryMachineLocation: dancer.primaryMachine || '',
      state: dancer.state || '',
      profilePictureUrl: dancer.profilePictureUrl || '',
    };

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      url: `dancers/${dancer.id}`,
      data: dancerSubmission,
    };

    let result = axiosClient
      .request(request)
      .then((): Result<Error, boolean> => ok(true))
      .catch(
        (): Result<Error, boolean> =>
          err(new Error('failed to update dancer'), false),
      );

    if (dancer.newProfilePicture.size > 0) {
      result = uploadProfilePicture(dancer.newProfilePicture);
    }

    activeDancers.delete('authUser');

    return result;
  };

  return { get, getByAuthenticationId, create, update };
};

export default dancersApiDao;
