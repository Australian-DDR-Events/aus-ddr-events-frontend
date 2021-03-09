import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DefaultBadge } from 'context/badges/constants';
import { err, ok, Result } from 'types/result';

import { Badge, BadgesDao } from './types';

const badgesApiDao = ({
  getIdTokenFunc,
  axiosClient,
}: {
  getIdTokenFunc: () => Promise<string>;
  axiosClient: AxiosInstance;
}): BadgesDao => {
  const getAll = async (): Promise<Result<Error, Array<Badge>>> => {
    return axiosClient
      .get(`/badges`)
      .then(
        (response: AxiosResponse<Array<Badge>>): Result<Error, Array<Badge>> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Array<Badge>> =>
          err(new Error('failed to get badges'), new Array<Badge>()),
      );
  };

  const getById = async (id: string): Promise<Result<Error, Badge>> => {
    return axiosClient
      .get(`/badges/${id}`)
      .then(
        (response: AxiosResponse<Badge>): Result<Error, Badge> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Badge> => {
          return err(new Error('failed to get badges'), DefaultBadge);
        },
      );
  };

  const getForDancerId = async (
    id: string,
  ): Promise<Result<Error, Array<Badge>>> => {
    const axiosRequest: AxiosRequestConfig = {
      params: {
        dancer_id: id,
      },
    };

    return axiosClient
      .get(`/badges`, axiosRequest)
      .then(
        (response: AxiosResponse<Array<Badge>>): Result<Error, Array<Badge>> =>
          ok(response.data),
      )
      .catch(
        (): Result<Error, Array<Badge>> => {
          return err(new Error('failed to get badges'), new Array<Badge>());
        },
      );
  };

  const assignBadge = async (
    dancerId: string,
    badgeId: string,
  ): Promise<Result<Error, void>> => {
    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'application/json',
      },
    };
    return axiosClient
      .post(`/badges/${badgeId}/dancers/${dancerId}`, null, request)
      .then((): Result<Error, void> => ok(undefined))
      .catch(() => err(new Error('failed to assign badge'), undefined));
  };

  const revokeBadge = async (
    dancerId: string,
    badgeId: string,
  ): Promise<Result<Error, void>> => {
    const request: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${await getIdTokenFunc()}`,
        'Content-Type': 'application/json',
      },
    };
    return axiosClient
      .delete(`/badges/${badgeId}/dancers/${dancerId}`, request)
      .then((): Result<Error, void> => ok(undefined))
      .catch(() => err(new Error('failed to assign badge'), undefined));
  };

  return { getAll, getById, getForDancerId, assignBadge, revokeBadge };
};

export default badgesApiDao;
