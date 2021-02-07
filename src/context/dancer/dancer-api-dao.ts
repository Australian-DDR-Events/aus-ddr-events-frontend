import { DefaultUser, User } from 'context/dancer';
import { err, ok, Result } from 'types/result';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ScoreSubmissionRequest } from 'context/dancer/types';

const dancerApiDao = ({
  getIdTokenFunc,
  baseApiUrl,
}: {
  getIdTokenFunc: () => Promise<string>;
  baseApiUrl: string;
}) => {
  const axiosClient = axios.create({
    baseURL: baseApiUrl,
    timeout: 6000,
  });

  const get = async (dancerId: string): Promise<Result<Error, User>> => {
    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
      },
    };

    return axiosClient
      .get(`/dancers/${dancerId}`, request)
      .then(
        (response: AxiosResponse): Result<Error, User> => {
          const user: User = {
            id: response.data.id,
            dancerId: response.data.ddrCode,
            dancerName: response.data.ddrName,
            primaryMachine: response.data.primaryMachineLocation,
            profilePicture: response.data.profilePictureUrl,
            newProfilePicture: new File([''], 'filename'),
            state: response.data.state,
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
      .post(`${baseApiUrl}/dancers/profilepicture`, data, request)
      .then((): Result<Error, boolean> => ok(true))
      .catch(
        (): Result<Error, boolean> =>
          err(new Error('failed to update user'), false),
      );
  };

  const update = async (user: User): Promise<Result<Error, boolean>> => {
    const dancer = {
      ddrName: user.dancerName || '',
      ddrCode: user.dancerId || '',
      primaryMachineLocation: user.primaryMachine || '',
      state: user.state || '',
      profilePictureUrl: user.profilePicture || '',
    };

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'application/json',
      },
      method: user.id ? 'PUT' : 'POST',
      url: user.id ? `dancers/${user.id}` : 'dancers',
      data: dancer,
    };

    let result = axiosClient
      .request(request)
      .then((): Result<Error, boolean> => ok(true))
      .catch(
        (): Result<Error, boolean> =>
          err(new Error('failed to update user'), false),
      );

    if (user.newProfilePicture.size > 0) {
      result = uploadProfilePicture(user.newProfilePicture);
    }
    return result;
  };

  const submitScore = async (
    scoreSubmission: ScoreSubmissionRequest,
  ): Promise<Result<Error, boolean>> => {
    const data = new FormData();
    data.append('Score', `${scoreSubmission.score}`);
    data.append('ScoreImage', scoreSubmission.scoreImage);
    data.append('SongId', scoreSubmission.songId);

    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    return axiosClient
      .post(`${baseApiUrl}/scores/submit`, data, request)
      .then((): Result<Error, boolean> => ok(true))
      .catch(
        (): Result<Error, boolean> =>
          err(new Error('failed to post score'), false),
      );
  };

  return { get, update, submitScore };
};

export default dancerApiDao;
