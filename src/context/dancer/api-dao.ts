import { DefaultDancer, Dancer } from 'context/dancer';
import { err, ok, Result } from 'types/result';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DancersDao } from 'context/dancer/types';

const dancersApiDao = ({
  getIdTokenFunc,
  axiosClient,
}: {
  getIdTokenFunc: () => Promise<string>;
  axiosClient: AxiosInstance;
}): DancersDao => {
  const getAll = async (): Promise<Result<Error, Array<Dancer>>> => {
    return axiosClient
      .get(`/dancers`)
      .then(
        (response: AxiosResponse): Array<Ingredient> => {
          return response.data.map(
            (dancer: Dancer): Dancer => dancer,
          );
        },
      )
      .then (
        (dancers: Array<Dancer>): Result<Error, Array<Dancer>> => ok(dancers),
      )
      .catch(
        (): Result<Error, Array<Dancer>> => {
          return err(
            new Error('failed to get dancers'),
            new Array<Dancer>(),
          );
        },
      );
  };


  const get = async (dancerId: string): Promise<Result<Error, Dancer>> => {
    return axiosClient
      .get(`/dancers/${dancerId}`)
      .then(
        (response: AxiosResponse): Result<Error, Dancer> => {
          const dancer: Dancer = {
            id: response.data.id,
            dancerId: response.data.ddrCode,
            dancerName: response.data.ddrName,
            primaryMachine: response.data.primaryMachineLocation,
            profilePicture: response.data.profilePictureUrl,
            newProfilePicture: new File([''], 'filename'),
            state: response.data.state,
            userName: '',
          };
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

  const update = async (dancer: Dancer): Promise<Result<Error, boolean>> => {
    const dancerSubmission = {
      ddrName: dancer.dancerName || '',
      ddrCode: dancer.dancerId || '',
      primaryMachineLocation: dancer.primaryMachine || '',
      state: dancer.state || '',
      profilePictureUrl: dancer.profilePicture || '',
    };

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'application/json',
      },
      method: dancer.id ? 'PUT' : 'POST',
      url: dancer.id ? `dancers/${dancer.id}` : 'dancers',
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

  return { get, update, getAll };
};

export default dancersApiDao;
